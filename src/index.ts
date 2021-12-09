// import Sortable from 'sortablejs'
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
  startDay: number
  endDay: number
  start: number
  end: number
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
  drawedEvents: { [key: string]: EventComputed } = {}
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
    const startLimit = new Date(this.currentYear, this.currentMonth, 1).getTime()
    const endLimit = new Date(this.currentYear, this.currentMonth + 1, 0).getTime()
    const leftMatch = e.start < startLimit && e.end > startLimit
    const centralMatch = e.start >= startLimit && e.end <= endLimit
    const rightMatch = e.start < endLimit && e.end > endLimit
    return leftMatch || centralMatch || rightMatch
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
        this.drawedEvents = {}
        this.events.filter(e => this.isDrawableNow(e)).forEach(e => {
          this.drawedEvents[e.id] = e
          this.drawEvent(e)
        })
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
      const sectionLabel = document.createElement('div')
      sectionLabel.classList.add('section-label')
      sectionLabel.innerText = s.label
      const eventsContainer = document.createElement('div')
      eventsContainer.classList.add('events-container')
      eventsContainer.style.position = 'relative'
      grid.appendChild(sectionLabel)
      grid.appendChild(eventsContainer)
    })

    const headingCell = grid.getElementsByClassName('day-labels')[0] as HTMLDivElement
    headingCell.style.gridTemplateColumns = `repeat(${this.totalDays}, minmax(32px, 1fr))`

    for (let i = 0; i < this.totalDays; i++) {
      const cell = document.createElement('div')
      cell.innerText = `${i + 1}`
      headingCell.appendChild(cell)
    }

    const eventsContainer = Array.from(grid.getElementsByClassName('events-container') as HTMLCollectionOf<HTMLDivElement>)

    eventsContainer.forEach(ec => {
      const cells = document.createElement('div')
      cells.classList.add('ssche__cells')
      cells.style.gridTemplateColumns = `repeat(${this.totalDays}, minmax(32px, 1fr))`
      for (let i = 0; i < this.totalDays; i++) {
        cells.appendChild(document.createElement('div'))
      }
      ec.appendChild(cells)
    })

    // Resize events
    const aux = document.getElementsByClassName('ssche__cells')[0].childNodes[0] as HTMLDivElement
    this.cellWidth = aux.getClientRects()[0].width
    window.addEventListener('resize', () => {
      this.cellWidth = aux.getClientRects()[0].width
      const events = Array.from(grid.getElementsByClassName('ssche__event') as HTMLCollectionOf<HTMLDivElement>)
      events.forEach(ev => {
        this.calcLeftSize(this.drawedEvents[ev.dataset.id as string])
        const { left, size } = this.calcLeftSize(this.drawedEvents[ev.dataset.id as string])
        ev.style.left = `${left}px`
        ev.style.width = `${size}px`
      })
    })
  }

  private computeEvent = (event: EventScheduler): EventComputed => {
    const section = this.sections.map(s => s.id).indexOf(event.section)
    const d1 = event.startDate.split('-')
    const d2 = event.endDate.split('-')
    const date1 = new Date(+d1[0], +d1[1] - 1, +d1[2])
    const date2 = new Date(+d2[0], +d2[1] - 1, +d2[2])
    return {
      id: event.id || '',
      event,
      section,
      startDay: date1.getDate(),
      endDay: date2.getDate(),
      start: date1.getTime(),
      end: date2.getTime()
    }
  }

  private calcTop = (event: EventComputed) => {
    const sectionEvents = this.events.filter(e => e.section === event.section)
    if (sectionEvents.length === 0) return 1
    const matches = sectionEvents.reduce((acc, sectionEvent) => {
      if (sectionEvent.id === event.id) return acc
      const leftMatch = sectionEvent.start < event.start && sectionEvent.end > event.start
      const centralMatch1 = sectionEvent.start >= event.start && sectionEvent.end <= event.end
      const centralMatch2 = sectionEvent.start < event.start && sectionEvent.end > event.end
      const rightMatch = sectionEvent.start < event.end && sectionEvent.end > event.end
      if (leftMatch || rightMatch || centralMatch1 || centralMatch2) return [...acc, sectionEvent]
      return acc
    }, [] as EventComputed[])

    // Obtener las medidas de top de los que ya se hayan pintado
    const tops = matches.reduce((acc, curr) => {
      const e = document.querySelector(`div.ssche__event[data-id="${curr.id}"]`) as HTMLDivElement
      if (e === null) return acc
      const topString = e.style.top
      const topNumber = +topString.substring(0, topString.length - 2)
      return [...acc, topNumber - 1]
    }, [] as number[]).sort((a, b) => a - b)

    // Casos base 
    if (tops.length === 0) return 1
    if (tops.length === 1) return tops[0] + 27

    // Buscar posibles espacios
    for (let i = 1; i < tops.length; i++) {
      if (tops[i] > tops[i - 1] + 26) {
        return tops[i - 1] + 27
      }
    }
    return tops[tops.length - 1] + 27
  }

  private calcLeftSize = (event: EventComputed) => {
    const startLimit = new Date(this.currentYear, this.currentMonth, 1).getTime()
    const endLimit = new Date(this.currentYear, this.currentMonth + 1, 0).getTime()
    const start = event.start < startLimit ? 0 : event.startDay - 1
    const end = event.end > endLimit ? this.totalDays : event.endDay - 1
    const range = end - start
    const width = this.cellWidth * range - 1
    return {
      left: start * this.cellWidth + 1,
      size: (width > 0 ? width : this.cellWidth) - 1,
    }
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
      newEvent.draggable = true
      newEvent.classList.add('ssche__event')
      newEvent.dataset['id'] = `${event.event.id}`
      newEvent.addEventListener('click', () => this.openModal(event.event))
      newEvent.style.top = `${this.calcTop(event)}px`
      const { left, size } = this.calcLeftSize(event)
      newEvent.style.left = `${left}px`
      newEvent.style.width = `${size}px`
      const section = grid.getElementsByClassName('events-container')[event.section] as HTMLDivElement
      section.appendChild(newEvent)
      this.fixHeightFromChildren(section)
    }
  }

  private fixHeightFromChildren = (eventsContainer: HTMLDivElement) => {
    const children = Array.from(eventsContainer.getElementsByClassName('ssche__event') as HTMLCollectionOf<HTMLDivElement>)
    let maxTop = 0
    children.forEach(ch => {
      const top = ch.style.top || '0px'
      const topValue = +top.substring(0, top.length - 2)
      if (maxTop < topValue) maxTop = topValue
    })
    eventsContainer.style.minHeight = `${maxTop + 26}px`
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
    if (this.isDrawableNow(computedEvent)) {
      this.drawEvent(computedEvent)
      this.drawedEvents[computedEvent.id] = computedEvent
    }
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
        delete this.drawedEvents[id]
        parent.removeChild(toRemove)
        const sectionEvents = Array.from(parent.getElementsByClassName('ssche__event') as HTMLCollectionOf<HTMLDivElement>)
        sectionEvents.forEach(se => {
          console.log(se)
          se.style.top = `${this.calcTop(this.drawedEvents[se.dataset.id as string])}px`
        })
        this.fixHeightFromChildren(parent)
      }
    }
  }
}

export default Scheduler as object
