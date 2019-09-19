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
      field: 'phone_number',
      align: 'right',
    },
    {
      label: 'Beheer',
      name: 'edit',
      sortable: false,
      align: 'left',
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
      align: 'right',
    },
    {
      label: 'Beheer',
      name: 'edit',
      field: 'edit',
      sortable: false,
      align: 'left',
    },
  ]
  it('creates default table properties based on label and name data', () => {
    expect(columns).to.eql(result)
  })
})
