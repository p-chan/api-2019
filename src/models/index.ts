export * from './asset'

export const upsertDocument = async (
  documentRef: FirebaseFirestore.DocumentReference<
    FirebaseFirestore.DocumentData
  >,
  data: any
) => {
  const document = await documentRef.get()

  return document.exists
    ? (async () => {
        delete data.created_at

        return await documentRef.update(data).catch(error => {
          throw new Error(error.message)
        })
      })()
    : (async () => {
        return await documentRef.set(data).catch(error => {
          throw new Error(error.message)
        })
      })()
}
