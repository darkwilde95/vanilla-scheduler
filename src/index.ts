import Sortable from 'sortablejs'
import '../styles/styles.css'

interface Section {
  id: string,
  label: string
}

interface ConfigObject {
  root: string
  sections: Section[],
  lang?: string,
  onlyRead?: boolean
}

interface EventScheduler {
  id?: string
  description: string
  section: string
  startTime: string
  startDate: string
  endTime: string
  endDate: string
}

interface EventComputed {
  id: string
  event: EventScheduler
  year1: number
  year2: number
  month1: number
  month2: number
  day1: number
  day2: number,
  section: number
}

class Scheduler {

  onlyRead: boolean = false
  cellWidth: number = 0
  createCallback: Function | null = null
  deleteCallback: Function | null = null
  editCallback: Function | null = null
  sections: Section[] = []
  totalDays = 0
  title: HTMLHeadingElement | null = null
  lang = 'en'
  currentMonth = new Date().getMonth()
  currentYear = new Date().getFullYear()
  rootId: string | null = null
  events: EventComputed[] = []
  langs: { [key: string]: any } = {
    en: {
      months: [
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'
      ],
      actions: {
        create: 'Create',
        save: 'Save',
        cancel: 'Cancel',
        present: 'Present',
        delete: 'Delete'
      },
      labels: {
        description: 'Description',
        section: 'Section',
        period: 'Time period'
      }
    },
    es: {
      months: [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto',
        'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
      ],
      actions: {
        create: 'Crear',
        save: 'Guardar',
        cancel: 'Cancelar',
        present: 'Presente',
        delete: 'Borrar'
      },
      labels: {
        description: 'Descripción',
        section: 'Sección',
        period: 'Periodo de tiempo'
      }
    }
  }

  private getTextLang = (key: string) => this.langs[this.lang][key]

  private closeModalEvent = (event: KeyboardEvent) => {
    if (event.key === 'Escape') this.closeModal()
  }

  private appendSelectOptions = (options: Section[], select: HTMLSelectElement) => {
    const defaultOpt = document.createElement('option') as HTMLOptionElement
    defaultOpt.innerText = '-'
    defaultOpt.value = ''
    select.appendChild(defaultOpt)
    options.forEach(e => {
      const opt = document.createElement('option') as HTMLOptionElement
      opt.innerText = e.label
      opt.value = e.id
      select.appendChild(opt)
    })
  }

  private openModal = (event?: EventScheduler) => {
    const body = document.getElementsByTagName('body')[0]
    const overlay = document.createElement('div')
    overlay.id = `${this.rootId}-modal`
    overlay.classList.add('ssche__overlay')
    overlay.innerHTML = `
      <div class="ssche__modal_body">
        <h2 class="ssche__modal_title">
          ${this.getTextLang('actions').create}
        </h2>
        <div class="ssche__modal_content">
          <div class="ssche__modal_form_row">
            <label for="${this.rootId}-description" class="ssche__modal_input_label">
              ${this.getTextLang('labels').description}
            </label>
            <textarea 
              rows="6"
              id="${this.rootId}-description" 
              class="ssche__modal_input"
              ></textarea>
          </div>
          <div class="ssche__modal_form_row">
            <label for="${this.rootId}-section" class="ssche__modal_input_label">
              ${this.getTextLang('labels').section}
            </label>
            <select 
              id="${this.rootId}-section" 
              class="ssche__modal_input"
            ></select>
          </div>
          <div class="ssche__modal_form_row">
            <label class="ssche__modal_input_label">
              ${this.getTextLang('labels').period}
            </label>
            <div class="ssche__modal_double_row">
              <div class="ssche__modal_range_row">
                <input id="${this.rootId}-start-time" type="time" class="ssche__range-input" />
                <input id="${this.rootId}-start-date" type="date" class="ssche" />
              </div>
              <div class="ssche__modal_range_row">
                <input id="${this.rootId}-end-time" type="time" class="ssche__range-input"/>
                <input id="${this.rootId}-end-date" type="date" class="ssche" />
              </div>
            </div>
          </div>
          <div class="ssche__modal_actions">
          ${event && !this.onlyRead ? `
            <button class="ssche__btn ssche__modal_btn_delete" id="${this.rootId}-modal-delete">
              ${this.getTextLang('actions').delete}
            </button>` : ''}
            <button class="ssche__btn ssche__modal_btn_cancel" id="${this.rootId}-modal-cancel">
              ${this.getTextLang('actions').cancel}
            </button>
            ${!this.onlyRead ? `
            <button class="ssche__btn ssche__modal_btn_save" id="${this.rootId}-modal-save">
              ${this.getTextLang('actions').save}
            </button>` : ''}
          </div>
        </div>
      </div>
    `
    body.appendChild(overlay)
    this.appendSelectOptions(this.sections, document.getElementById(`${this.rootId}-section`) as HTMLSelectElement)
    overlay.addEventListener('click', event => {
      const target = event.target as HTMLElement
      if (target.id === `${this.rootId}-modal`) this.closeModal()
    })
    const cancelButton = document.getElementById(`${this.rootId}-modal-cancel`) as HTMLButtonElement
    cancelButton.addEventListener('click', this.closeModal, true)
    if (this.onlyRead) cancelButton.style.marginRight = '0px'
    document.addEventListener('keydown', this.closeModalEvent, true)

    const description = document.getElementById(`${this.rootId}-description`) as HTMLTextAreaElement
    const section = document.getElementById(`${this.rootId}-section`) as HTMLSelectElement
    const startDate = document.getElementById(`${this.rootId}-start-date`) as HTMLInputElement
    const endDate = document.getElementById(`${this.rootId}-end-date`) as HTMLInputElement
    const startTime = document.getElementById(`${this.rootId}-start-time`) as HTMLInputElement
    const endTime = document.getElementById(`${this.rootId}-end-time`) as HTMLInputElement
    const saveButton = document.getElementById(`${this.rootId}-modal-save`) as HTMLButtonElement

    if (!this.onlyRead) {

      startDate.addEventListener('change', e => {
        endDate.min = (e.target as HTMLInputElement).value
        saveButton.disabled = startDate.value === '' || endDate.value === ''
          || section.value === '' || description.value === ''
      })
      endDate.addEventListener('change', e => {
        startDate.max = (e.target as HTMLInputElement).value
        saveButton.disabled = startDate.value === '' || endDate.value === ''
          || section.value === '' || description.value === ''
      })
      section.addEventListener('change', () => {
        saveButton.disabled = startDate.value === '' || endDate.value === ''
          || section.value === '' || description.value === ''
      })
      description.addEventListener('change', () => {
        saveButton.disabled = startDate.value === '' || endDate.value === ''
          || section.value === '' || description.value === ''
      })
      startTime.addEventListener('change', e => {
        const startTimeString = (e.target as HTMLInputElement).value
        endTime.min = startTimeString
        const st = new Date(0, 0, 0, +startTimeString.split(':')[0], +startTimeString.split(':')[1])
        const et = new Date(0, 0, 0, +endTime.value.split(':')[0], +endTime.value.split(':')[1])
        if (et.getTime() < st.getTime()) endTime.value = ''
      })
      saveButton.disabled = startDate.value === '' || endDate.value === ''
        || section.value === '' || description.value === ''
      saveButton.addEventListener('click', () => {
        const eventData: { [key: string]: any } = {
          description: description.value,
          section: section.value,
          startTime: startTime.value,
          startDate: startDate.value,
          endTime: endTime.value,
          endDate: endDate.value
        }
        if (event) {
          eventData['id'] = event.id
          if (this.editCallback) this.editCallback(eventData)
          else throw new Error("Callback 'onEventEdited' isn't defined.")
        } else {
          if (this.createCallback) this.createCallback(eventData)
          else throw new Error("Callback 'onEventCreated' isn't defined.")
        }
        this.closeModal()
      })
    } else {
      description.disabled = true
      section.disabled = true
      startTime.disabled = true
      startDate.disabled = true
      endTime.disabled = true
      endDate.disabled = true
    }
    if (event) {
      description.value = event.description
      section.value = event.section
      startDate.value = event.startDate
      endDate.value = event.endDate
      startTime.value = event.startTime
      endTime.value = event.endTime
      if (!this.onlyRead) {
        const deleteButton = document.getElementById(`${this.rootId}-modal-delete`) as HTMLButtonElement
        deleteButton.addEventListener('click', () => {
          if (this.deleteCallback) this.deleteCallback(event)
          else throw new Error("Callback 'onEventDeleted' isn't defined.")
          this.closeModal()
        })
        saveButton.disabled = false
      }
    }
  }

  private closeModal = () => {
    const body = document.getElementsByTagName('body')[0]
    const modal = document.getElementById(`${this.rootId}-modal`)
    if (modal) body.removeChild(modal)
    document.removeEventListener('keydown', this.closeModalEvent, true)
  }

  private isDrawableNow = (e: EventComputed) => {
    if (e.year1 > this.currentYear || e.year2 < this.currentYear) return false
    const sameYear = e.year1 === e.year2
    if (sameYear && (this.currentMonth < e.month1 || e.month2 < this.currentMonth)) return false
    if (!sameYear) {
      if (this.currentYear === e.year1 && this.currentMonth < e.month1) return false
      if (this.currentYear === e.year2 && this.currentMonth > e.month2) return false
    }
    return true
  }

  private updateCalendar = () => {
    if (this.title) this.title.innerText = `${this.getTextLang('months')[this.currentMonth]} ${this.currentYear}`
    const currentGrid = document.getElementById(`${this.rootId}-grid`)
    if (this.rootId) {
      const root = document.getElementById(this.rootId)
      if (root && currentGrid) {
        if (currentGrid) root.removeChild(currentGrid)
        const date = new Date(this.currentYear, this.currentMonth + 1, 0)
        this.totalDays = date.getDate()
        const newGrid = document.createElement('div') as HTMLDivElement
        newGrid.innerHTML = `
          <div class="ssche__grid-head"></div>
          <div class="ssche__grid-head day-labels"></div>
        `
        newGrid.classList.add('ssche__grid')
        newGrid.id = `${this.rootId}-grid`
        root.append(newGrid)
        this.createGrid()
        this.events.filter(e => this.isDrawableNow(e)).forEach(e => this.drawEvent(e))
      }
    } else throw new Error("Root HTML Element doesn't exists.")
  }

  private createHeading = () => {
    const heading = document.getElementById(`${this.rootId}-heading`) as HTMLDivElement
    if (heading) {
      heading.innerHTML = `
        ${this.onlyRead ? '<div></div>' : `
        <button id="${this.rootId}-btn-create" class="ssche__btn ssche__heading_button">
          ${this.langs[this.lang].actions.create}
        </button>`}
        <h1 id="${this.rootId}-title">${this.getTextLang('months')[this.currentMonth]} ${this.currentYear}</h1>
        <div class="ssche__heading_controls">
          <div id="${this.rootId}-left-control" class="ssche__control ssche__control_side">
            &#129136;
          </div>
          <div id="${this.rootId}-present-control" class="ssche__control">
            ${this.getTextLang('actions').present}
          </div>
          <div id="${this.rootId}-right-control" class="ssche__control ssche__control_side">
            &#129138;
          </div>
        </div>
      `
    }

    if (!this.onlyRead) {
      const button = document.getElementById(`${this.rootId}-btn-create`) as HTMLButtonElement
      button.addEventListener('click', () => this.openModal())
    }

    this.title = document.getElementById(`${this.rootId}-title`) as HTMLHeadingElement
    const leftControl = document.getElementById(`${this.rootId}-left-control`) as HTMLDivElement
    leftControl.addEventListener('click', () => {
      this.currentMonth -= 1
      if (this.currentMonth < 0) {
        this.currentMonth = 11
        this.currentYear -= 1
      }
      this.updateCalendar()
    })
    const rightControl = document.getElementById(`${this.rootId}-right-control`) as HTMLDivElement
    rightControl.addEventListener('click', () => {
      this.currentMonth += 1
      if (this.currentMonth > 11) {
        this.currentMonth = 0
        this.currentYear += 1
      }
      this.updateCalendar()
    })
    const presentControl = document.getElementById(`${this.rootId}-present-control`) as HTMLDivElement
    presentControl.addEventListener('click', () => {
      const currentDate = new Date()
      this.currentMonth = currentDate.getMonth()
      this.currentYear = currentDate.getFullYear()
      this.updateCalendar()
    })
  }

  private createGrid = () => {
    const grid = document.getElementById(`${this.rootId}-grid`) as HTMLDivElement

    this.sections.forEach(s => {
      const cellLabel = document.createElement('div')
      cellLabel.classList.add('section-label')
      cellLabel.innerText = s.label
      const sectionSpaceCell = document.createElement('div')
      sectionSpaceCell.classList.add('events-container')
      sectionSpaceCell.style.position = 'relative'
      grid.appendChild(cellLabel)
      grid.appendChild(sectionSpaceCell)
    })

    const headingCell = grid.getElementsByClassName('day-labels')[0] as HTMLDivElement
    headingCell.style.gridTemplateColumns = `repeat(${this.totalDays}, minmax(32px, 1fr))`

    for (let i = 0; i < this.totalDays; i++) {
      const cell = document.createElement('div')
      cell.innerText = `${i + 1}`
      headingCell.appendChild(cell)
    }
    const sectionSpaceCell = grid.getElementsByClassName('events-container')

    for (let i = 0; i < sectionSpaceCell.length; i++) {
      const row = sectionSpaceCell[i]
      const cells = document.createElement('div')
      cells.classList.add('ssche__cells')
      cells.style.gridTemplateColumns = `repeat(${this.totalDays}, minmax(32px, 1fr))`
      for (let i = 0; i < this.totalDays; i++) {
        cells.appendChild(document.createElement('div'))

      }
      row.appendChild(cells)
    }


    const aux = grid.childNodes[this.totalDays + 1] as HTMLDivElement
    this.cellWidth = aux.getClientRects()[0].width
    // window.onresize = () => {
    //   this.cellWidth = aux.getClientRects()[0].width
    //   const events = grid.getElementsByClassName('ssche__event') as HTMLCollectionOf<HTMLDivElement>
    //   for (let i = 0; i < events.length; i++) {
    //     const start = events[i].dataset['start'] || '0'
    //     const end = events[i].dataset['end'] || '0'
    //     const range = +end - +start
    //     events[i].style.width = `${this.cellWidth * (range > 0 ? range : 1)}px`
    //   }
    // }
  }

  private computeEvent = (event: EventScheduler): EventComputed => {
    const section = this.sections.map(s => s.id).indexOf(event.section) + 1
    const d1 = event.startDate.split('-')
    const d2 = event.endDate.split('-')
    const date1 = new Date(+d1[0], +d1[1] - 1, +d1[2])
    const date2 = new Date(+d2[0], +d2[1] - 1, +d2[2])
    return {
      id: event.id || '',
      event,
      section,
      day1: date1.getDate(),
      day2: date2.getDate(),
      month1: date1.getMonth(),
      month2: date2.getMonth(),
      year1: date1.getFullYear(),
      year2: date2.getFullYear(),
    }
  }

  private calculatePos = (event: EventComputed) => {
    const sectionEvents = this.events.filter(e => e.section === event.section)
    if (sectionEvents.length === 0) return 0
    const matches = sectionEvents.reduce((acc, curr) => {
      if (curr.id === event.id) return acc
      let leftMatch = false
      let rightMatch = false
      let centralMatch = false
      let startCurr = this.currentMonth === curr.month1 ? curr.day1 : 1
      let endCurr = this.currentMonth === curr.month2 ? curr.day2 : this.totalDays
      let startEv = this.currentMonth === event.month1 ? event.day1 : 1
      let endEv = this.currentMonth === event.month2 ? event.day2 : this.totalDays
      if (curr.month1 !== curr.month2 || event.month1 !== event.month2) {
        // Matchs mes con inicios y finales diferentes
        leftMatch = endEv > startCurr && startEv < startCurr
        rightMatch = startEv < endCurr && endEv > endCurr
        centralMatch = startEv >= startCurr && endEv <= endCurr
      } else {
        // Estos sirven cuando es el mismo mes
        leftMatch = event.day2 > curr.day1 && event.day1 < curr.day1
        rightMatch = event.day1 < curr.day2 && event.day2 > curr.day2
        centralMatch = event.day1 >= curr.day1 && event.day2 <= curr.day2
      }
      if (leftMatch || rightMatch || centralMatch) return [...acc, curr]
      return acc
    }, [] as EventComputed[])

    // Obtener las medidas de top de los que ya se hayan pintado
    const tops = matches.reduce((acc, curr) => {
      const e = document.querySelector(`div.ssche__event[data-id="${curr.id}"]`) as HTMLDivElement
      if (e === null) return acc
      const topString = e.style.top
      return [...acc, +topString.substring(0, topString.length - 2)]
    }, [] as number[]).sort((a, b) => a - b)

    // Caso base (Si no hay eventos pintados)
    if (tops.length === 0) return 0

    // Buscar posibles espacios
    let top = 0
    for (let i = 1; i < tops.length; i++) {
      top = tops[i]
      if (tops[i] > tops[i - 1] + 26) {
        top = tops[i - 1] + 26
        break
      }
    }

    if (top === tops[tops.length - 1]) top += 26
    return top
  }

  private drawEvent = (event: EventComputed) => {
    const grid = document.getElementById(`${this.rootId}-grid`)
    if (!grid) throw new Error("Grid doesn't exists.")
    else {
      const newEvent = document.createElement('div')
      newEvent.innerHTML = `
        <span class="ssche__event-drag-control">&#8759;</span>
        <span class="ssche__event-desc">${event.event.description}</span>
      `
      newEvent.classList.add('ssche__event')
      newEvent.dataset['id'] = `${event.event.id}`
      let start = event.month1 !== this.currentMonth ? 1 : event.day1
      let end = event.month2 !== this.currentMonth ? this.totalDays : event.day2
      let pos = this.totalDays * event.section + start
      let range = 0
      newEvent.dataset['start'] = `${start}`
      newEvent.dataset['end'] = `${end}`
      range = end - start
      const width = this.cellWidth * range - 1
      newEvent.style.width = `${width > 0 ? width : this.cellWidth - 1}px`
      newEvent.addEventListener('click', () => this.openModal(event.event))
      newEvent.style.top = `${this.calculatePos(event)}px`
      const cell = grid.childNodes[pos] as HTMLDivElement
      this.fixHeightFromChildren(cell)
      cell.appendChild(newEvent)
    }
  }

  private fixHeightFromChildren = (cell: HTMLDivElement) => {
    const children = cell.childNodes
    let maxTop = 0
    children.forEach(n => {
      const child = n as HTMLDivElement
      const top = child.style.top || '0px'
      const topValue = +top.substring(0, top.length - 2)
      if (maxTop < topValue) maxTop = topValue
    })
    cell.style.minHeight = `${maxTop + 26}px`
  }

  constructor(config: ConfigObject) {
    this.rootId = config.root
    this.onlyRead = config.onlyRead || false
    const root = document.getElementById(this.rootId)
    this.sections = config.sections
    if (config.lang) this.lang = config.lang
    if (root) root.classList.add('ssche__container')
    else throw new Error("Root HTML Element doesn't exists.")
    const date = new Date(this.currentYear, this.currentMonth + 1, 0)
    this.totalDays = date.getDate()
    root.innerHTML = `
      <div id="${this.rootId}-heading" class="ssche__heading"></div>
      <div id="${this.rootId}-grid" class="ssche__grid">
        <div class="ssche__grid-head"></div>
        <div class="ssche__grid-head day-labels"></div>
      </div>
    `
    this.createHeading()
    this.createGrid()
  }

  public onEventCreated = (cb: Function) => { this.createCallback = cb }

  public onEventDeleted = (cb: Function) => { this.deleteCallback = cb }

  public onEventEdited = (cb: Function) => { this.editCallback = cb }

  public addEvent = (event: EventScheduler) => {
    const computedEvent = this.computeEvent(event)
    if (this.isDrawableNow(computedEvent)) this.drawEvent(computedEvent)
    this.events.push(computedEvent)
  }

  public removeEvent = (id: string | null) => {
    if (id === null) throw new Error(`Id not valid: ${id}`)
    else {
      const toRemove = document.querySelector(`div.ssche__event[data-id="${id}"]`) as HTMLDivElement
      if (toRemove === null) throw new Error(`No events with id: ${id}`)
      else {
        const parent = toRemove.parentElement as HTMLDivElement
        this.events = this.events.filter(e => e.id !== id)
        parent.removeChild(toRemove)
        this.fixHeightFromChildren(parent)
      }
    }
  }
}

export default Scheduler as object
