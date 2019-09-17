import { expect } from 'chai'
import { addColumnDefaults, IColumns } from '../../../src/table'

describe('setColumnDefaults', () => {
  const columns: IColumns[] = addColumnDefaults([
    {
      label: 'ID',
      name: 'id',
    },
    {
      label: 'E-mail',
      name: 'email',
    },
    {
      label: 'Telefoonnummer',
      name: 'phone_number',
    },
    {
      label: 'Beheer',
      name: 'edit',
    },
  ])

  const result: IColumns[] = [
    {
      label: 'ID',
      name: 'id',
      field: 'id',
      sortable: true,
      align: 'left',
    },
    {
      label: 'E-mail',
      name: 'email',
      field: 'email',
      sortable: true,
      align: 'left',
    },
    {
      label: 'Telefoonnummer',
      name: 'phone_number',
      field: 'phone_number',
      sortable: true,
      align: 'left',
    },
    {
      label: 'Beheer',
      name: 'edit',
      field: 'edit',
      sortable: true,
      align: 'left',
    },
  ]
  it('creates default table properties based on label and name data', () => {
    expect(columns).to.eql(result)
  })
})
