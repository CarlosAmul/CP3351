import fb from './fb'

const createSampleData = async () => {
  const init = fb.functions().httpsCallable('createSampleData');
  const response = await init()
  console.log(response)
}

const createSampleCenters = async () => {
  const init = fb.functions().httpsCallable('createSampleCenters');
  const response = await init()
  console.log(response)
}

const createHistoricReadingsSample = async () => {
  const init = fb.functions().httpsCallable('createHistoricReadingsSample');
  const response = await init()
  console.log(response)
}

const init = async () => {
  await createSampleData()
  await createSampleCenters()
  await createHistoricReadingsSample()
}
init()
