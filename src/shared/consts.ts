export const LOCAL_STORAGE_PREFIX = 'VOC_ANALYSIS'
export const Models = [
  //   'ST1',
  //   'NEXO',
  //   'KONA Electric',
  //   'IONIQ 6',
  //   'The new IONIQ 5',
  //   'PORTER 2 Electric',
  //   'PORTER 2 Electric Special',
  'AVANTE',
  //   'AVANTE Hypbrid',
  'GRANDEUR',
  //   'GRANDEUR Hybrid',
  //   'SONATA',
  //   'SONATA The Edge Hybrid',
  //   'CASPER',
  //   'CASPER Electric',
  //   'VENUE',
  //   'KONA',
  //   'KONA Hybrid',
  //   'The new TUCSON',
  //   'The new TUCSON Hybrid',
  //   'The all-new SANTA FE',
  //   'The all-new SANTA FE Hybrid',
  //   'PALISADE',
  //   'STARIA Lounge',
  //   'STARIA Lounge Hybrid',
  //   'STARIA',
  //   'STARIA Hybrid',
  //   'STARIA Kinder',
  //   'STARIA Lounge Camper',
  //   'STARIA Lounge Limousine',
  //   'AVANTE N',
  //   'IONIQ 5 N',
  //   'GRANDEUR Taxi',
  //   'SONATA Taxi',
  //   'STARIA Lounge Mobility',
  //   'PORTER 2',
  //   'PORTER 2 Special',
  //   'Genesis G90',
  //   'Genesis G80',
  //   'Genesis G80 Electric',
  //   'Genesis G70',
  //   'Genesis GV80 COUPE',
  //   'Genesis GV80',
  //   'Genesis GV70',
  //   'Genesis GV70 Electric',
  //   'Genesis GV60',
  //   'Super Aero City',
  //   'Universe',
  //   'COUNTY New Breeze',
  //   'Elec City',
  //   'EX5',
  //   'EX6',
  //   'EX8',
  //   'Pavise',
  //   'HD450',
  //   'HD450L',
  //   'HD500',
  //   'HD600L',
  //   'HD700',
  //   'HD1000',
  //   'XCIENT Fuel Cell',
  //   'XCIENT',
] as const

export const Labels = [
  'enhancement',
  'bug',
  'praise',
  'question',
  'complaints',
  'others',
] as const

export const Types = ['critical', 'negative', 'neutral', 'positive'] as const

export const ChartSelectOptions = [
  { value: 'bar', label: 'Bar Chart' },
  { value: 'line', label: 'Line Chart' },
  { value: 'pie', label: 'Pie Chart' },
  { value: 'table', label: 'Table' },
] as const

export const DurationSelectOptions = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
] as const
