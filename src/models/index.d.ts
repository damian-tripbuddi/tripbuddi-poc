import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Message {
  readonly id: string;
  readonly channel: string;
  readonly message: string;
  readonly user: string;
  readonly createdAt?: string;
  readonly localCreatedAt?: string;
  constructor(init: ModelInit<Message>);
  static copyOf(source: Message, mutator: (draft: MutableModel<Message>) => MutableModel<Message> | void): Message;
}

export declare class UserProfile {
  readonly id: string;
  readonly isComplete: boolean;
  readonly username: string;
  readonly preferredName: string;
  readonly createdAt?: string;
  readonly avatar?: string;
  readonly avatarOriginalUrl?: string;
  constructor(init: ModelInit<UserProfile>);
  static copyOf(source: UserProfile, mutator: (draft: MutableModel<UserProfile>) => MutableModel<UserProfile> | void): UserProfile;
}