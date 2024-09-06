import { CollectionConfig } from 'payload';

const Customers: CollectionConfig = {
  slug: 'customers', // The unique identifier for this collection
  auth: true, // Enable authentication for this collection
  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true, // Ensure each email is unique
    },
    {
      name: 'password',
      type: 'text',
      required: true, // Field for storing user passwords
    },
    // Additional fields for customer data
    {
      name: 'firstName',
      type: 'text',
      required: true,
    },
    {
      name: 'lastName',
      type: 'text',
      required: true,
    },
    {
      name: 'address',
      type: 'textarea',
    },
    {
      name: 'phoneNumber',
      type: 'text',
    },
    // Add other custom fields as needed
  ],
  // access: {
  //   // Define access controls for the collection
  //   read: ({ req: { user } }) => !!user, // Allow reading only for authenticated users
  //   update: ({ req: { user } }) => !!user, // Allow updating only for authenticated users
  //   create: () => true, // Allow anyone to create (register) a new customer
  //   delete: ({ req: { user } }) => !!user, // Allow deletion only for authenticated users
  // },
};

export default Customers;