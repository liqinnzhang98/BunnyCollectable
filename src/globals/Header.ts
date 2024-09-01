import {GlobalConfig} from "payload"

export const Header: GlobalConfig = {
    slug: 'header',
    fields: [
        {
            name: 'logo',
            label: 'Logo',
            type: 'upload',
            relationTo: 'media',
            required: true,

        },
        {
            name: 'nav',
            label: 'Navigation',
            type: 'array',
            fields: [
                {
                    name: 'label',
                    label: 'Label',
                    type: 'text',

                },
                {
                    name: 'link',
                    label: 'Link',
                    type: 'text',
                },
                {
                    name: 'subItems',
                    label: 'Sub Items',
                    type: 'array',
                    fields: [
                      {
                        name: 'label',
                        label: 'Label',
                        type: 'text',
                        required: true,
                      },
                      {
                        name: 'link',
                        label: 'Link',
                        type: 'text',
                      },
                    ],

                },

                
            ],
            minRows: 1,
            maxRows: 5,
            required: true,
        },
        {
            name: 'userLinks',
            label: 'User Links',
            type: 'array',
            fields: [
              {
                name: 'label',
                label: 'Label',
                type: 'text',
                required: true,
              },
              {
                name: 'link',
                label: 'Link',
                type: 'text',
                required: true,
              },
            ],
            minRows: 2, // Minimum of 2 links for 'Login' and 'Register'
            maxRows: 2, // Fixed at 2 links for 'Login' and 'Register'
            required: true,
          },
    ]
}