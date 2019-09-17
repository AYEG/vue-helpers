export const addColumnDefaults = (columns: IColumns[]): IColumns[] => {
  columns.forEach((column: IColumns): IColumns => {
    if (column.field === undefined) column.field = column.name
    if (column.label === undefined) column.label = column.name
    if (column.sortable === undefined) column.sortable = true
    if (column.align === undefined) column.align = 'left'
    return column
  })
  return columns
}

export interface IColumns {
  name: string
  field?: string | fieldFunction,
  label?: string,
  required?: boolean,
  sortable?: boolean,
  align?: string,
  sort?: void
  format?: void
  style?: string,
  classes?: string,
}

// tslint:disable-next-line:no-any
type fieldFunction = (_: any) => string | number | boolean
