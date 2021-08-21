import { FcSettings } from 'react-icons/fc'


export default {
    name: 'siteSettings',
    title: 'Seetings',
    icon: FcSettings,
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string'
        },
        {
            name: 'description',
            title: 'description',
            type: 'string'
        },
        {
            name: 'favicon',
            title: 'Favicon',
            type: 'image',
            options: {
                metadata: ['location', 'palette']
            }
        },
        {
            name: 'logo',
            title: 'Logo',
            type: 'image'
        },
    ]
}