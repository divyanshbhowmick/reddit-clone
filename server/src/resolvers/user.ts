import { MyContext } from "src/types";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import argon2 from "argon2";
import { User } from "./../entities/User";
import {
  generateErrorObjFromValidationResponse,
  validateUser,
} from "./../utils/helpers/validator";

@InputType()
class UsernamePasswordInput {
  @Field()
  username: string;
  @Field()
  password: string;
}

@ObjectType()
export class FieldError {
  @Field(() => String, { nullable: true })
  field?: string;

  @Field(() => String, { nullable: true })
  message?: string;
}

@ObjectType()
class UserResponse {
  // ? is that it can be null and ! is that it is required.
  // we are statically mentioning the type because we want it to return null too if there is no error
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  // we are statically mentioning the type because we want it to return null too if there is no error
  @Field(() => User, { nullable: true })
  user?: User;
}
@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req, em }: MyContext): Promise<User | null> {
    if (!req.session.userID) return null;
    const user = await em.findOne(User, { id: req.session.userID });
    return user;
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("options") { username, password }: UsernamePasswordInput,
    @Ctx() { em, req }: MyContext
  ): Promise<UserResponse> {
    try {
      await validateUser({ username, password });
    } catch (err) {
      return {
        errors: generateErrorObjFromValidationResponse(err.details),
      };
    }
    const hashedPassword = await argon2.hash(password);
    const user = em.create(User, { username, password: hashedPassword });
    try {
      await em.persistAndFlush(user);
    } catch (err) {
      // TODO: Remove the error code checking logic
      if (err.code === "23505")
        return {
          errors: [{ field: "username", message: "Useraname already exists!" }],
        };
    }
    req.session.userID = user.id;
    return {
      user,
    };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("options") { username, password }: UsernamePasswordInput,
    @Ctx() { em, req }: MyContext
  ): Promise<UserResponse> {
    const user = await em.findOne(User, { username });
    if (!user) {
      return {
        errors: [{ field: "username", message: "Username not found!" }],
      };
    }
    const isUserVerified = await argon2.verify(user.password, password);
    if (!isUserVerified) {
      return {
        errors: [{ field: "password", message: "Invalid Login!" }],
      };
    }
    req.session!.userID = user.id;
    return {
      user,
    };
  }
}
