'use strict'
/* eslint-env browser */
/* globals chrome, Utils */

const {
  agent,
  open,
  i18n,
  getOption,
  setOption,
  promisify,
  sendMessage,
} = Utils

function setDisabledDomain(enabled) {
  if (enabled) {
    document
      .querySelector('.footer__switch--enabled')
      .classList.add('footer__switch--hidden')
    document
      .querySelector('.footer__switch--disabled')
      .classList.remove('footer__switch--hidden')
  } else {
    document
      .querySelector('.footer__switch--enabled')
      .classList.remove('footer__switch--hidden')
    document
      .querySelector('.footer__switch--disabled')
      .classList.add('footer__switch--hidden')
  }
}

const Popup = {
  /**
   * Initialise popup
   */
  async init() {
    // Templates
    Popup.templates = Array.from(
      document.querySelectorAll('[data-template]')
    ).reduce((templates, template) => {
      templates[template.dataset.template] = template.cloneNode(true)

      template.remove()

      return templates
    }, {})

    // Disabled domains
    let disabledDomains = await getOption('disabledDomains', [])

    // Theme mode
    const themeMode = await getOption('themeMode', false)

    if (themeMode) {
      document.querySelector('body').classList.add('theme-mode')
    }

    // Terms
    const termsAccepted =
      agent === 'chrome' || (await getOption('termsAccepted', false))

    if (termsAccepted) {
      document.querySelector('.terms').classList.add('terms--hidden')
      document.querySelector('.empty').classList.remove('empty--hidden')

      Popup.onGetDetections(await Popup.driver('getDetections'))
    } else {
      document.querySelector('.terms').classList.remove('terms--hidden')
      document.querySelector('.detections').classList.add('detections--hidden')
      document.querySelector('.empty').classList.add('empty--hidden')

      document.querySelector('.terms').addEventListener('click', async () => {
        await setOption('termsAccepted', true)

        document.querySelector('.terms').classList.add('terms--hidden')
        document.querySelector('.empty').classList.remove('empty--hidden')

        Popup.onGetDetections(await Popup.driver('getDetections'))
      })
    }

    // Alert
    const tabs = await promisify(chrome.tabs, 'query', {
      active: true,
      currentWindow: true,
    })

    if (tabs && tabs.length) {
      const [{ url }] = tabs

      if (url.startsWith('http')) {
        document.querySelector('.alerts').classList.remove('alerts--hidden')

        document.querySelector(
          '.alerts__link'
        ).href = `https://www.wappalyzer.com/alerts/?url=${encodeURIComponent(
          `${url}`
        )}`

        const { hostname } = new URL(url)

        setDisabledDomain(disabledDomains.includes(hostname))

        document
          .querySelector('.footer__switch--disabled')
          .addEventListener('click', async () => {
            disabledDomains = disabledDomains.filter(
              (_hostname) => _hostname !== hostname
            )

            await setOption('disabledDomains', disabledDomains)

            setDisabledDomain(false)

            Popup.onGetDetections(await Popup.driver('getDetections'))
          })

        document
          .querySelector('.footer__switch--enabled')
          .addEventListener('click', async () => {
            disabledDomains.push(hostname)

            await setOption('disabledDomains', disabledDomains)

            setDisabledDomain(true)

            Popup.onGetDetections(await Popup.driver('getDetections'))
          })
      } else {
        for (const el of document.querySelectorAll('.footer__switch')) {
          el.classList.add('footer__switch--hidden')
        }

        document.querySelector('.alerts').classList.add('alerts--hidden')
      }
    }

    document
      .querySelector('.footer__settings')
      .addEventListener('click', () => chrome.runtime.openOptionsPage())

    // Apply internationalization
    i18n()
  },

  driver(func, args) {
    return sendMessage('popup.js', func, args)
  },

  /**
   * Log debug messages to the console
   * @param {String} message
   */
  log(message) {
    Popup.driver('log', message)
  },

  /**
   * Group technologies into categories
   * @param {Object} technologies
   */
  categorise(technologies) {
    return Object.values(
      technologies
        .filter(({ confidence }) => confidence >= 50)
        .reduce((categories, technology) => {
          technology.categories.forEach((category) => {
            categories[category.id] = categories[category.id] || {
              ...category,
              technologies: [],
            }

            categories[category.id].technologies.push(technology)
          })

          return categories
        }, {})
    )
  },

  /**
   * Callback for getDetection listener
   * @param {Array} detections
   */
  async onGetDetections(detections = []) {
    if (!detections || !detections.length) {
      document.querySelector('.empty').classList.remove('empty--hidden')
      document.querySelector('.detections').classList.add('detections--hidden')

      return
    }

    document.querySelector('.empty').classList.add('empty--hidden')

    const el = document.querySelector('.detections')

    el.classList.remove('detections--hidden')

    while (el.firstChild) {
      el.removeChild(detections.lastChild)
    }

    const pinnedCategory = await getOption('pinnedCategory')

    const categorised = Popup.categorise(detections)

    categorised.forEach(({ id, name, slug: categorySlug, technologies }) => {
      const categoryNode = Popup.templates.category.cloneNode(true)

      const link = categoryNode.querySelector('.category__link')

      link.href = `https://www.wappalyzer.com/technologies/${categorySlug}/`
      link.dataset.i18n = `categoryName${id}`

      const pins = categoryNode.querySelectorAll('.category__pin')

      if (pinnedCategory === id) {
        pins.forEach((pin) => pin.classList.add('category__pin--active'))
      }

      pins.forEach((pin) =>
        pin.addEventListener('click', async () => {
          const pinnedCategory = await getOption('pinnedCategory')

          Array.from(
            document.querySelectorAll('.category__pin--active')
          ).forEach((pin) => pin.classList.remove('category__pin--active'))

          if (pinnedCategory === id) {
            await setOption('pinnedCategory', null)
          } else {
            await setOption('pinnedCategory', id)

            pins.forEach((pin) => pin.classList.add('category__pin--active'))
          }
        })
      )

      technologies
        .filter(({ confidence }) => confidence >= 50)
        .forEach(({ name, slug, confidence, version, icon, website }) => {
          const technologyNode = Popup.templates.technology.cloneNode(true)

          const image = technologyNode.querySelector('.technology__icon')

          image.src = `../images/icons/${icon}`

          const link = technologyNode.querySelector('.technology__link')

          link.href = `https://www.wappalyzer.com/technologies/${categorySlug}/${slug}/`
          link.textContent = name

          const confidenceNode = technologyNode.querySelector(
            '.technology__confidence'
          )

          if (confidence < 100) {
            confidenceNode.textContent = `${confidence}% sure`
          } else {
            confidenceNode.remove()
          }

          const versionNode = technologyNode.querySelector(
            '.technology__version'
          )

          if (version) {
            versionNode.textContent = version
          } else {
            versionNode.remove()
          }

          categoryNode
            .querySelector('.technologies')
            .appendChild(technologyNode)
        })

      document.querySelector('.detections').appendChild(categoryNode)
    })

    if (categorised.length === 1) {
      document
        .querySelector('.detections')
        .appendChild(Popup.templates.category.cloneNode(true))
    }

    Array.from(document.querySelectorAll('a')).forEach((a) =>
      a.addEventListener('click', (event) => {
        event.preventDefault()

        open(a.href)

        return false
      })
    )

    i18n()
  },
}

if (/complete|interactive|loaded/.test(document.readyState)) {
  Popup.init()
} else {
  document.addEventListener('DOMContentLoaded', Popup.init)
}
