// Base for Scheduler -> UI only works for day complete.
// If UI with hours is required, look for comments with 'HOURS' key for reset code.

import '../styles/styles.css'

interface Section {
  id: string,
  label: string
  [key: string]: string
}

interface SectionConfig {
  propToVerify: string
  optionsToApply: string[]
  colorState: {
    background: string
    text?: string
    border?: string
  }
}
interface ConstructorConfig {
  root: string
  sections: Section[]
  lang?: string
  onlyRead?: boolean
  filters?: {
    [field: string]: string[]
  }
  sectionConfigs?: SectionConfig[]
}

interface DataEvent {
  id?: string
  description: string
  section: string
  startTime: string
  startDate: string
  endTime: string
  endDate: string
}

interface ComputedEvent {
  id: string
  eventFormData: DataEvent
  startDay: number
  endDay: number
  start: number
  end: number
  section: number
}

class Scheduler {

  filters: { [field: string]: string[] } | null = null
  filtersSelected: { [field: string]: string[] } = {}
  sectionsConfigs: SectionConfig[] = []
  isFiltering: boolean = false
  onlyRead: boolean = false
  cellWidth: number = 0
  createCallback: Function | null = null
  deleteCallback: Function | null = null
  editCallback: Function | null = null
  eventDraggedCallback: Function | null = null
  sections: Section[] = []
  drawnSections: Section[] = []
  totalDays = 0
  title: HTMLHeadingElement | null = null
  lang = 'en'
  currentMonth = new Date().getMonth()
  currentYear = new Date().getFullYear()
  rootId: string | null = null
  events: ComputedEvent[] = []
  drawnEvents: { [key: string]: ComputedEvent } = {}
  eventDragging: HTMLDivElement | null = null
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
        delete: 'Delete',
        filter: 'Filter',
        removeFilter: 'Delete filter'
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
        delete: 'Borrar',
        filter: 'Filtrar',
        removeFilter: 'Borrar filtros'
      },
      labels: {
        description: 'Descripción',
        section: 'Sección',
        period: 'Periodo de tiempo'
      }
    }
  }

  // Get text on current lang (langs prop has texts)
  private getTextLang = (key: string) => {
    if (this.lang in this.langs) return this.langs[this.lang][key]
    else {
      console.warn(`Lang: ${this.lang} is not available. Fallback lang: 'en'`)
      return this.langs['en'][key]
    }
  }

  // Event for close modal (reused)
  private closeModalEvent = (event: KeyboardEvent) => {
    if (event.key === 'Escape') this.closeModal()
  }

  // Append options for select html
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

  // Draw modal for create an edit (if event is not null => edit mode)
  private createEditModal = (event?: DataEvent) => {

    // Disable buttons for re-open modals
    const createButton = document.getElementById(`${this.rootId}-btn-create`) as HTMLButtonElement
    createButton.disabled = true
    if (this.filters) {
      const filtersButton = document.getElementById(`${this.rootId}-filters`) as HTMLButtonElement
      filtersButton.disabled = true
    }

    // Draw modal body and overlay
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
            <div class="ssche__modal_multi_row">
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
    this.appendSelectOptions(this.drawnSections, document.getElementById(`${this.rootId}-section`) as HTMLSelectElement)

    // Close modal when click overlay
    overlay.addEventListener('click', event => {
      const target = event.target as HTMLElement
      if (target.id === `${this.rootId}-modal`) this.closeModal()
    })

    // Event on cancel button close modal too
    const cancelButton = document.getElementById(`${this.rootId}-modal-cancel`) as HTMLButtonElement
    cancelButton.addEventListener('click', this.closeModal)
    if (this.onlyRead) cancelButton.style.marginRight = '0px'
    document.addEventListener('keydown', this.closeModalEvent)

    const description = document.getElementById(`${this.rootId}-description`) as HTMLTextAreaElement
    const section = document.getElementById(`${this.rootId}-section`) as HTMLSelectElement
    const startDate = document.getElementById(`${this.rootId}-start-date`) as HTMLInputElement
    const endDate = document.getElementById(`${this.rootId}-end-date`) as HTMLInputElement
    const startTime = document.getElementById(`${this.rootId}-start-time`) as HTMLInputElement
    const endTime = document.getElementById(`${this.rootId}-end-time`) as HTMLInputElement
    const saveButton = document.getElementById(`${this.rootId}-modal-save`) as HTMLButtonElement

    if (!this.onlyRead) {
      const disableSaveBtn = () => {
        saveButton.disabled = startDate.value === '' || endDate.value === ''
          || section.value === '' || description.value === ''
      }
      // Validations in modal form
      startDate.addEventListener('change', e => {
        endDate.min = (e.target as HTMLInputElement).value
        disableSaveBtn()
      })
      endDate.addEventListener('change', e => {
        startDate.max = (e.target as HTMLInputElement).value
        disableSaveBtn()
      })
      section.addEventListener('change', disableSaveBtn)
      description.addEventListener('input', disableSaveBtn)

      startTime.addEventListener('change', e => {
        const startTimeString = (e.target as HTMLInputElement).value
        endTime.min = startTimeString
        const st = new Date(0, 0, 0, +startTimeString.split(':')[0], +startTimeString.split(':')[1])
        const et = new Date(0, 0, 0, +endTime.value.split(':')[0], +endTime.value.split(':')[1])
        if (et.getTime() < st.getTime()) endTime.value = ''
      })
      disableSaveBtn()

      // Event for generate data from form for use in callbacks
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
          if (this.editCallback) this.editCallback(event, eventData)
          else throw new Error("Callback 'onEventEdited' isn't defined.")
        } else {
          if (this.createCallback) this.createCallback(eventData)
          else throw new Error("Callback 'onEventCreated' isn't defined.")
        }
        this.closeModal()
      })
    } else {
      // Only read mode disables the data inputs
      description.disabled = true
      section.disabled = true
      startTime.disabled = true
      startDate.disabled = true
      endTime.disabled = true
      endDate.disabled = true
    }

    // Modal in edit mode
    if (event) {
      description.value = event.description
      section.value = event.section
      startDate.value = event.startDate
      endDate.value = event.endDate
      startDate.max = event.endDate
      endDate.min = event.startDate
      startTime.value = event.startTime
      endTime.value = event.endTime
      startTime.max = event.endTime
      endTime.min = event.startTime
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

  // Actions for close modal
  private closeModal = () => {
    const body = document.getElementsByTagName('body')[0]
    const modal = document.getElementById(`${this.rootId}-modal`)
    if (modal) body.removeChild(modal)
    const createButton = document.getElementById(`${this.rootId}-btn-create`) as HTMLButtonElement
    createButton.disabled = false
    if (this.filters) {
      const filtersButton = document.getElementById(`${this.rootId}-filters`) as HTMLButtonElement
      filtersButton.disabled = false
    }
    document.removeEventListener('keydown', this.closeModalEvent)

  }

  // Verify if event is drawable with current month and year
  private isDrawableNow = (e: ComputedEvent) => {
    const startLimit = new Date(this.currentYear, this.currentMonth, 1).getTime()
    const endLimit = new Date(this.currentYear, this.currentMonth + 1, 0).getTime()
    const leftMatch = e.start < startLimit && e.end > startLimit
    const centralMatch = e.start >= startLimit && e.end <= endLimit
    const rightMatch = e.start <= endLimit && e.end > endLimit
    const horizontalMatch = leftMatch || centralMatch || rightMatch
    if (this.drawnSections.length !== this.sections.length)
      return horizontalMatch && this.drawnSections.map(s => s.id).includes(e.eventFormData.section)
    else return horizontalMatch
  }

  // Update scheduler when change current month in scheduler controls
  private updateScheduler = (wasFiltered = false) => {
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
        this.drawnEvents = {}
        if (wasFiltered) this.events = this.events.map(e => this.computeEvent(e.eventFormData))
        this.events.filter(e => this.isDrawableNow(e)).forEach(e => {
          this.drawnEvents[e.id] = e
          this.drawEvent(e)
        })
      }
    } else throw new Error("Root HTML Element doesn't exist.")
  }

  // Draw Scheduler controls 
  private createHeading = () => {
    const heading = document.getElementById(`${this.rootId}-heading`)
    if (!heading) throw new Error("Root HTML Element doesn't exist.")
    else {
      heading.innerHTML = `
        ${this.onlyRead ? '<div></div>' : `
        <div style="display: flex; align-items: center; height: 100%">
          <button id="${this.rootId}-btn-create" class="ssche__btn ssche__heading_button">
            ${this.langs[this.lang].actions.create}
          </button>
          ${this.filters ? `
          <button 
            id="${this.rootId}-filters" 
            style="margin-left: 16px" 
            class="ssche__btn ssche__heading_button"
          >
            ${this.langs[this.lang].actions.filter}
          </button>` : ''}
        </div>`}
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
      if (!this.onlyRead) {
        const button = document.getElementById(`${this.rootId}-btn-create`) as HTMLButtonElement
        button.addEventListener('click', () => this.createEditModal())
      }

      if (this.filters) {
        const filters = document.getElementById(`${this.rootId}-filters`) as HTMLButtonElement
        filters.addEventListener('click', () => this.filtersModal())
      }

      this.title = document.getElementById(`${this.rootId}-title`) as HTMLHeadingElement
      const leftControl = document.getElementById(`${this.rootId}-left-control`) as HTMLDivElement
      leftControl.addEventListener('click', () => {
        this.currentMonth -= 1
        if (this.currentMonth < 0) {
          this.currentMonth = 11
          this.currentYear -= 1
        }
        this.updateScheduler()
      })
      const rightControl = document.getElementById(`${this.rootId}-right-control`) as HTMLDivElement
      rightControl.addEventListener('click', () => {
        this.currentMonth += 1
        if (this.currentMonth > 11) {
          this.currentMonth = 0
          this.currentYear += 1
        }
        this.updateScheduler()
      })
      const presentControl = document.getElementById(`${this.rootId}-present-control`) as HTMLDivElement
      presentControl.addEventListener('click', () => {
        const currentDate = new Date()
        this.currentMonth = currentDate.getMonth()
        this.currentYear = currentDate.getFullYear()
        this.updateScheduler()
      })
    }
  }

  // Draw Grid
  private createGrid = () => {
    const grid = document.getElementById(`${this.rootId}-grid`)
    if (!grid) throw new Error("Root HTML Element doesn't exist.")
    else {
      // Creating rows by # sections 
      this.drawnSections.forEach((s, index) => {
        const sectionLabel = document.createElement('div')
        sectionLabel.classList.add('section-label')
        sectionLabel.innerText = s.label
        const eventsContainer = document.createElement('div')
        eventsContainer.classList.add('events-container')
        eventsContainer.style.position = 'relative'
        grid.appendChild(sectionLabel)
        grid.appendChild(eventsContainer)
        this.sectionsConfigs.forEach(sectionConfig => {
          if (sectionConfig.optionsToApply.includes(s[sectionConfig.propToVerify])) {
            sectionLabel.style.backgroundColor = sectionConfig.colorState.background
            if (sectionConfig.colorState.text) sectionLabel.style.color = sectionConfig.colorState.text
            if (sectionConfig.colorState.border) sectionLabel.style.borderColor = sectionConfig.colorState.border
          }
        })
      })

      // Creating table head
      const headingCell = grid.getElementsByClassName('day-labels')[0] as HTMLDivElement
      headingCell.style.gridTemplateColumns = `repeat(${this.totalDays}, minmax(40px, 1fr))`

      for (let i = 0; i < this.totalDays; i++) {
        const cell = document.createElement('div')
        cell.innerText = `${i + 1}`
        headingCell.appendChild(cell)
      }

      // Creating cells time limits and dragging zones
      const eventsContainer = Array.from(grid.getElementsByClassName('events-container') as HTMLCollectionOf<HTMLDivElement>)
      eventsContainer.forEach((ec, index) => {
        const cells = document.createElement('div')
        const dragZone = document.createElement('div')
        cells.classList.add('ssche__cells')
        cells.style.gridTemplateColumns = `repeat(${this.totalDays}, minmax(40px, 1fr))`
        dragZone.classList.add('ssche__drag-zone')
        for (let i = 0; i < this.totalDays; i++) {
          const cell = document.createElement('div')
          cells.appendChild(cell)
          this.sectionsConfigs.forEach(sectionConfig => {
            if (sectionConfig.optionsToApply.includes(this.drawnSections[index][sectionConfig.propToVerify])) {
              cell.style.backgroundColor = sectionConfig.colorState.background
              if (sectionConfig.colorState.border) cell.style.borderColor = sectionConfig.colorState.border
            }
          })
        }
        ec.appendChild(dragZone)
        ec.appendChild(cells)
      })

      // Get cell width for calculate times and event width
      const aux = document.getElementsByClassName('ssche__cells')[0].childNodes[0] as HTMLDivElement
      this.cellWidth = aux.getClientRects()[0].width

      // Event for resize events width when window resizes
      window.addEventListener('resize', () => {
        const aux = document.getElementsByClassName('ssche__cells')[0].childNodes[0] as HTMLDivElement
        this.cellWidth = aux.getClientRects()[0].width
        const events = Array.from(grid.getElementsByClassName('ssche__event') as HTMLCollectionOf<HTMLDivElement>)
        events.forEach(ev => {
          this.calcLeftSize(this.drawnEvents[ev.dataset.id as string])
          const { left, size } = this.calcLeftSize(this.drawnEvents[ev.dataset.id as string])
          ev.style.left = `${left}px`
          ev.style.width = `${size}px`
        })
      })
    }
  }

  // Get event data for easy calc later
  private computeEvent = (event: DataEvent): ComputedEvent => {
    const section = this.drawnSections.map(s => s.id).indexOf(event.section)
    const d1 = event.startDate.split('-')
    const d2 = event.endDate.split('-')
    const date1 = new Date(+d1[0], +d1[1] - 1, +d1[2])
    const date2 = new Date(+d2[0], +d2[1] - 1, +d2[2] + 1) // HOURS: Remove '+1' for start to work with hours in UI
    return {
      id: event.id || '',
      eventFormData: event,
      section,
      startDay: date1.getDate(),
      endDay: date2.getDate(),
      start: date1.getTime(),
      end: date2.getTime()
    }
  }

  // Calc 'top' css prop for vertical positioning in same section
  private calcTop = (event: ComputedEvent, sectionEvents: ComputedEvent[]) => {
    // minTop is '2px' for simulate event is contained in section
    // No section events -> don't need calc anymore
    const grid = document.getElementById(`${this.rootId}-grid`) as HTMLDivElement
    if (!grid) throw new Error("Root HTML Element doesn't exist.")
    else {
      if (sectionEvents.length === 0) return 2

      // Calc all possible date matches of date in section events
      const matches = sectionEvents.reduce((acc, sectionEvent) => {
        if (sectionEvent.id === event.id) return acc
        const leftMatch = sectionEvent.start < event.start && sectionEvent.end > event.start
        const isContainer = sectionEvent.start >= event.start && sectionEvent.end <= event.end
        const isContained = sectionEvent.start < event.start && sectionEvent.end > event.end
        const rightMatch = sectionEvent.start < event.end && sectionEvent.end > event.end
        if (leftMatch || rightMatch || isContainer || isContained) return [...acc, sectionEvent]
        return acc
      }, [] as ComputedEvent[])

      // Get 'top' measurements for calc max
      const tops = matches.reduce((acc, curr) => {
        const e = grid.querySelector(`div.ssche__event[data-id="${curr.id}"]`) as HTMLDivElement
        if (e === null) return acc
        const topString = e.style.top
        const topNumber = +topString.substring(0, topString.length - 2)
        return [...acc, topNumber - 2]
      }, [] as number[]).sort((a, b) => a - b)

      // No matches
      if (tops.length === 0) return 2

      // there's a space on top of section
      if (tops[0] !== 0) return 2

      // Looking for possible spaces
      for (let i = 1; i < tops.length; i++) {
        if (tops[i] > tops[i - 1] + 26) {
          return tops[i - 1] + 28
        }
      }
      return tops[tops.length - 1] + 28
    }
  }

  // Calc 'left' and 'width' css props for horizontal positioning and space
  private calcLeftSize = (event: ComputedEvent) => {
    const startLimit = new Date(this.currentYear, this.currentMonth, 1).getTime()
    const endLimit = new Date(this.currentYear, this.currentMonth + 1, 0).getTime()
    // Calc if limits are in current month o different
    const start = event.start < startLimit ? 0 : event.startDay - 1
    const end = event.end > endLimit ? this.totalDays : event.endDay - 1

    // Calc 'width' size
    const range = end - start
    const width = this.cellWidth * range - 1 // '-1' for simulate event is contained
    return {
      left: start * this.cellWidth + 1, // '+1' for simulate event is contained
      size: width > 0 ? width : this.cellWidth
    }
  }

  // Function for draw event (Only use when is sure a event must be drawn)
  private drawEvent = (event: ComputedEvent) => {
    const grid = document.getElementById(`${this.rootId}-grid`)
    if (!grid) throw new Error("Root HTML Element doesn't exist.")
    else {
      const newEvent = document.createElement('div')
      newEvent.innerHTML = `<span>${event.eventFormData.description}</span>`
      newEvent.classList.add('ssche__event')
      newEvent.dataset['id'] = `${event.eventFormData.id}`
      newEvent.addEventListener('dblclick', () => this.createEditModal(event.eventFormData))
      const { left, size } = this.calcLeftSize(event)
      newEvent.style.left = `${left}px`
      newEvent.style.width = `${size}px`
      const dragZone = grid.getElementsByClassName('ssche__drag-zone')[event.section] as HTMLDivElement
      dragZone.appendChild(newEvent)
      this.updateVertical(event.section)
      if (!this.onlyRead) this.addDragging(newEvent)
    }
  }

  // Reorder events for adjust space and height
  private updateVertical = (section: number) => {
    const grid = document.getElementById(`${this.rootId}-grid`)
    if (!grid) throw new Error("Root HTML Element doesn't exist.")
    else {
      const sectionRow = grid.getElementsByClassName('ssche__drag-zone')[section]
      const sectionEvents = Array.from(sectionRow?.getElementsByClassName('ssche__event') as HTMLCollectionOf<HTMLDivElement>)
      sectionEvents.sort((a1, b1) => {
        const a2 = this.drawnEvents[a1.dataset.id as string]
        const b2 = this.drawnEvents[b1.dataset.id as string]
        return (b2.end - b2.start) - (a2.end - a2.start)
      })
      // Update section height when add or remove for change space
      const sectionComputedEvents = [] as ComputedEvent[]
      let maxTop = 0
      sectionEvents.forEach(se => {
        let topValue = 0
        topValue = this.calcTop(this.drawnEvents[se.dataset.id as string], sectionComputedEvents)
        se.style.top = `${topValue}px`
        sectionComputedEvents.push(this.drawnEvents[se.dataset.id as string])
        if (maxTop < topValue) maxTop = topValue
      })
      const eventsContainer = sectionRow?.parentNode as HTMLDivElement
      eventsContainer.style.minHeight = `${maxTop + 26}px`
    }
  }

  // Horizontal draggin feature
  private addDragging = (event: HTMLDivElement) => {
    let hasMoveX = false, hasMoveY = false
    let firstPosX = 0, deltaX = 0
    const grid = document.getElementById(`${this.rootId}-grid`)
    const dragZones = Array.from(grid?.getElementsByClassName('ssche__drag-zone') as HTMLCollectionOf<HTMLDivElement>)
    const oldEventData = { ...this.drawnEvents[event.dataset.id as string].eventFormData }

    // Event for clean when mouseclick release
    const closeDragElement = () => {
      if ((hasMoveX || hasMoveY) && this.eventDraggedCallback) {
        this.eventDraggedCallback(
          oldEventData,
          this.drawnEvents[this.eventDragging?.dataset.id as string].eventFormData
        )
      }
      this.eventDragging = null
      dragZones.forEach(dz => { dz.onmousemove = null })
      document.removeEventListener('mouseup', closeDragElement)
    }

    // Wrap event functions for give index of dragzone
    const addEventHandlers = (dragZone: HTMLDivElement, index: number) => {

      // Events when move 'event' elements
      const moveEvent = (e: MouseEvent) => {
        const computed = this.drawnEvents[event.dataset.id as string]
        const evt = (e || window.event) as MouseEvent;
        const target = e.target as HTMLDivElement
        e.preventDefault();
        deltaX = firstPosX - evt.clientX;

        // Detect change of time (Day change)
        if (Math.abs(deltaX) > this.cellWidth) {
          firstPosX = evt.clientX
          const deltaDay = Math.round(deltaX / this.cellWidth)
          const startDate = new Date(computed.start)
          const endDate = new Date(computed.end)
          startDate.setDate(startDate.getDate() - deltaDay)
          endDate.setDate(endDate.getDate() - deltaDay)
          computed.start = startDate.getTime()
          computed.startDay = startDate.getDate()
          computed.end = endDate.getTime()
          computed.endDay = endDate.getDate()
          const startDateStr = startDate.toISOString()
          endDate.setDate(endDate.getDate() - 1) // HOURS: Remove '-1' for start to work with hours in UI
          const endDateStr = endDate.toISOString()
          computed.eventFormData.startDate = startDateStr.substring(0, startDateStr.indexOf('T'))
          computed.eventFormData.endDate = endDateStr.substring(0, endDateStr.indexOf('T'))
          hasMoveX = true
        }

        // Detect change between drag zones (update section)
        const isDragZone = target.classList.contains('ssche__drag-zone')
        const eventParent = this.eventDragging?.parentNode as HTMLDivElement
        if (isDragZone && target !== eventParent) {
          eventParent.removeChild(this.eventDragging as HTMLDivElement)
          target.appendChild(this.eventDragging as HTMLDivElement)
          this.updateVertical(computed.section)
          computed.section = index
          computed.eventFormData.section = this.drawnSections[index].id
          hasMoveY = true
        }

        // Update visual if necessary
        if (hasMoveX || hasMoveY) {
          const { left, size } = this.calcLeftSize(computed)
          event.style.left = `${left}px`
          event.style.width = `${size}px`
          this.updateVertical(computed.section)
          hasMoveX = false
          hasMoveY = false
        }
      }
      dragZone.onmousemove = moveEvent
      document.addEventListener('mouseup', closeDragElement)
    }

    // Init events of dragging when mouse click is pressed
    const dragMouseDown = (e: MouseEvent) => {
      e = e || window.event;
      e.preventDefault();
      firstPosX = e.clientX;
      this.eventDragging = event
      dragZones.forEach((dz, index) => { addEventHandlers(dz, index) })
    }

    event.onmousedown = dragMouseDown
  }

  // Filters modal
  private filtersModal = () => {
    // Do only if filters have been supplied
    if (this.filters) {
      // Disable buttons for re-open modals
      const createButton = document.getElementById(`${this.rootId}-btn-create`) as HTMLButtonElement
      createButton.disabled = true
      const filtersButton = document.getElementById(`${this.rootId}-filters`) as HTMLButtonElement
      filtersButton.disabled = true

      // Draw modal body and overlay
      const body = document.getElementsByTagName('body')[0]
      const overlay = document.createElement('div')
      overlay.id = `${this.rootId}-modal`
      overlay.classList.add('ssche__overlay')
      overlay.innerHTML = `
        <div class="ssche__modal_body">
          <h2 class="ssche__modal_title">
            ${this.getTextLang('actions').filter}
          </h2>
          <div class="ssche__modal_content">
            ${Object.keys(this.filters).reduce((acc, curr) => acc + this.filterField(curr), '')}
            <div class="ssche__modal_actions">
              <button class="ssche__btn ssche__modal_btn_delete" id="${this.rootId}-modal-remove">
                ${this.getTextLang('actions').removeFilter}
              </button>
              <button class="ssche__btn ssche__modal_btn_cancel" id="${this.rootId}-modal-cancel">
                ${this.getTextLang('actions').cancel}
              </button>
              <button class="ssche__btn ssche__modal_btn_save" id="${this.rootId}-modal-filter">
                ${this.getTextLang('actions').filter}
              </button>
            </div>
          </div>
        </div>
      `
      body.appendChild(overlay)
      const cancelButton = document.getElementById(`${this.rootId}-modal-cancel`) as HTMLButtonElement
      cancelButton.addEventListener('click', this.closeModal)
      overlay.addEventListener('click', event => {
        const target = event.target as HTMLElement
        if (target.id === `${this.rootId}-modal`) this.closeModal()
      })
      document.addEventListener('keydown', this.closeModalEvent)

      // Filter action
      const filterButton = document.getElementById(`${this.rootId}-modal-filter`) as HTMLButtonElement
      filterButton.addEventListener('click', () => {
        if (this.filters) {
          this.filtersSelected = {}
          Object.keys(this.filters).forEach(field => {
            const checked = overlay.querySelectorAll<HTMLInputElement>(`.${field}-filter:checked`)
            if (checked.length > 0) {
              this.filtersSelected[field] = Array.from(checked).map(checkbox => checkbox.value)
            }
          })
          this.closeModal()
          if (Object.keys(this.filtersSelected).length > 0) filtersButton.classList.add('ssche__button-active')
          this.drawnSections = this.sections.filter(section => {
            let match = true
            Object.keys(this.filtersSelected).forEach(field => {
              match = match && this.filtersSelected[field].includes(section[field])
            })
            return match
          })
          this.updateScheduler(true)
        }
      })

      // Add 1-minimum checked option listener for turn available filter button
      const checkboxes = Array.from(overlay.querySelectorAll<HTMLInputElement>(`input[type="checkbox"]`))
      const disableButton = () => {
        const disabled = checkboxes.reduce((acc, curr) => {
          return acc && !curr.checked
        }, true)
        filterButton.disabled = disabled
      }
      checkboxes.forEach(checkbox => { checkbox.addEventListener('change', () => disableButton()) })
      disableButton()

      // Remove filters action
      const removeFilter = document.getElementById(`${this.rootId}-modal-remove`) as HTMLButtonElement
      removeFilter.addEventListener('click', () => {
        this.filtersSelected = {}
        const checkboxes = Array.from(overlay.querySelectorAll<HTMLInputElement>('input[type="checkbox"]'))
        checkboxes.forEach(checkbox => { checkbox.checked = false })
        filtersButton.classList.remove('ssche__button-active')
        this.closeModal()
        this.drawnSections = [...this.sections]
        this.updateScheduler(true)
      })

      // Load previows filters
      const fields = Object.keys(this.filtersSelected)
      if (fields.length > 0) {
        fields.forEach(field => {
          this.filtersSelected[field].forEach(option => {
            const checkbox = overlay.querySelector(`.${field}-filter[value="${option}"]`) as HTMLInputElement
            checkbox.checked = true
          })
        })
      }
    }
  }

  // String of html field checkboxes
  private filterField = (field: string) => {
    if (this.filters) {
      return `
        <div class="ssche__modal_form_row">
          <p style="margin: 0; line-height: 1;" class="ssche__modal_input_label">
            ${field}:
          </p>
          <div class="ssche__modal_multi_row">
            ${this.filters[field].reduce((acc, curr, i) => acc + `              
              <div class="ssche__checkbox-form-group">
                <input 
                  id="${this.rootId}-${field}-${i}"
                  type="checkbox"
                  class="${field}-filter"
                  value="${curr}"
                />
                <label 
                  style="display: flex; align-items: center;"
                  for="${this.rootId}-${field}-${i}"
                >
                  ${curr}
                </label>
              </div>
            `, '')}
          </div>
        </div>
      `
    } else return ''
  }

  private sectionUISettings = (currentIndex: number) => {
    const grid = document.getElementById(`${this.rootId}-grid`)
    if (!grid) throw new Error('')
    else {
      const sectionData = this.sections[currentIndex]
      const sectionTitle = grid.getElementsByClassName('section-label')[currentIndex] as HTMLDivElement
      const sectionBody = grid.getElementsByClassName('events-container')[currentIndex] as HTMLDivElement
      this.sectionsConfigs.forEach(sectionConfig => {
        if (sectionConfig.optionsToApply.includes(sectionData[sectionConfig.propToVerify])) {
          sectionTitle.style.backgroundColor = sectionConfig.colorState.background
          if (sectionConfig.colorState.text) sectionTitle.style.color = sectionConfig.colorState.text
          if (sectionConfig.colorState.border) sectionTitle.style.borderColor = sectionConfig.colorState.border
          const cells = Array.from(sectionBody.childNodes[1].childNodes) as HTMLDivElement[]
          cells.forEach(cell => {
            cell.style.backgroundColor = sectionConfig.colorState.background
            if (sectionConfig.colorState.border) cell.style.borderColor = sectionConfig.colorState.border
          })
        }
      })
    }
  }

  constructor(config: ConstructorConfig) {
    this.rootId = config.root
    this.onlyRead = config.onlyRead || false
    const root = document.getElementById(this.rootId)
    this.sections = [...config.sections]
    this.drawnSections = config.sections
    this.sectionsConfigs = config.sectionConfigs || []
    if ('filters' in config) this.filters = config.filters || null
    if (config.lang) this.lang = config.lang
    if (root) root.classList.add('ssche__container')
    else throw new Error("Root HTML Element doesn't exist.")
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

  // Callbacks for backend use of user
  public onEventCreated = (cb: Function) => { this.createCallback = cb }

  public onEventDeleted = (cb: Function) => { this.deleteCallback = cb }

  public onEventEdited = (cb: Function) => { this.editCallback = cb }

  public onEventUpdatedByDrag = (cb: Function) => { this.eventDraggedCallback = cb }

  // Add event to scheduler (mainly for user use)
  // New events must have unique ID
  public addEvent = (event: DataEvent) => {
    const computedEvent = this.computeEvent(event)
    this.events.push(computedEvent)
    if (this.isDrawableNow(computedEvent)) {
      this.drawnEvents[computedEvent.id] = computedEvent
      this.drawEvent(computedEvent)
    }
  }

  // Remove event from scheduler (mainly for user use)
  public removeEvent = (id: string | null) => {
    if (id === null) throw new Error(`Id not valid: ${id}`)
    else {
      const grid = document.getElementById(`${this.rootId}-grid`)
      const toRemove = grid?.querySelector(`div.ssche__event[data-id="${id}"]`) as HTMLDivElement
      if (toRemove === null) throw new Error(`No events with id: ${id}`)
      else {
        const dragZone = toRemove.parentElement as HTMLDivElement
        const sectionPos = this.drawnEvents[id].section
        this.events = this.events.filter(e => e.id !== id)
        delete this.drawnEvents[id]
        dragZone.removeChild(toRemove)
        this.updateVertical(sectionPos)
      }
    }
  }

  public updateSectionData = (id: string, sectionData: Section) => {
    const section = this.sections.find(s => s.id === id) as Section
    Object.keys(section).forEach(field => {
      if (field !== 'id') section[field] = sectionData[field]
    })
    this.sectionUISettings(this.drawnSections.map(s => s.id).indexOf(section.id))
  }
}

export default Scheduler