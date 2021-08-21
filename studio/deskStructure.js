import S, { documentListItem } from '@sanity/desk-tool/structure-builder'


export default () =>
  S.list()
    .title('Base')
    .items(
        [
            ...S.documentTypeListItems().filter(item => !['siteSettings'].includes(item.getId())),
            
            // Option Settings
            S.listItem()
                .title('Settings')
                .child(
                    S.document()
                        .title('Settings')
                        .schemaType('siteSettings')
                        .documentId('siteSettings')
                )
        ],

)