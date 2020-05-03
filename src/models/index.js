// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Message, UserProfile } = initSchema(schema);

export {
  Message,
  UserProfile
};