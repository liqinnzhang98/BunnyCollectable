import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
    // Email added by default
    // Add more fields as needed
  ],

  access: {
    // Define access controls for the collection
    read: () => true, // Admins should have read access
    update: () => true, // Admins should have update access
    create: () => true, // Admins should be able to create
    delete: () => true, // Admins should be able to delete
  },
}
