import GetArtist from "./hook/GetArtist"
test('artist debe ser string vacio', () => {
  const testValue = GetArtist()
  let artist = testValue[0]
  console.log(artist)
  expect(artist).toEqual("")
})
test('searchArtist array vacio', () => {
  const testValue = GetArtist()
  let searchArtist= testValue[1]
  expect(searchArtist).toEqual([])
})
test('showModal debe ser false al principio', () => {
  const testValue = GetArtist()
  let showModal= testValue[2]
  expect(showModal).toEqual(false)
})
test('newMessage debe ser false al principio', () => {
  const testValue = GetArtist()
  let newMessage= testValue[3]
  expect(newMessage).toEqual(false)
})





