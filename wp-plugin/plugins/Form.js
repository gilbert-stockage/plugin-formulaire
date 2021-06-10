function FormPlugin() {
  return {
    install(Vue, options) {
      const SALON_ORIGIN = 'Salon'
      const CHAMBRE_ORIGIN = 'Chambre'
      const CUISINE_ORIGIN = 'Cuisine'

      let formModel = {
        Salon: {
          canape: {
            imgSrc: 'canape',
            name: 'Canapé',
            origin: SALON_ORIGIN,
            volume: 1.5
          },
          fauteuil: {
            imgSrc: 'fauteuil',
            name: 'Fauteuil',
            origin: SALON_ORIGIN,
            volume: 0.4
          },
          television: {
            imgSrc: 'tv',
            name: 'Télévision',
            origin: SALON_ORIGIN,
            volume: 0.2
          },
          meuble_tv: {
            imgSrc: 'meuble_tv',
            name: 'Meuble TV',
            origin: SALON_ORIGIN,
            volume: 0.4
          },
          table: {
            imgSrc: 'table',
            name: 'Table',
            origin: SALON_ORIGIN,
            volume: 1.3
          },
          chaise: {
            imgSrc: 'chaise',
            name: 'Chaise',
            origin: SALON_ORIGIN,
            volume: 0.2
          },
          table_basse: {
            imgSrc: 'table_basse',
            name: 'Table basse',
            origin: SALON_ORIGIN,
            volume: 0.5
          },
          carton_salon: {
            imgSrc: 'carton',
            name: 'Carton',
            origin: SALON_ORIGIN,
            volume: 0.1
          }
        },
        Cuisine: {
          frigo_haut: {
            imgSrc: 'frigo_haut',
            name: 'Frigo haut',
            origin: CUISINE_ORIGIN,
            volume: 0.4
          },
          frigo_bas: {
            imgSrc: 'frigo_bas',
            name: 'Frigo bas',
            origin: CUISINE_ORIGIN,
            volume: 0.24
          },
          four: {
            imgSrc: 'four',
            name: 'Four',
            origin: CUISINE_ORIGIN,
            volume: 0.12
          },
          lave_vaisselle: {
            imgSrc: 'lave_vaisselle',
            name: 'Lave vaisselle',
            origin: CUISINE_ORIGIN,
            volume: 0.4
          },
          machine_a_laver: {
            imgSrc: 'lave_linge',
            name: 'Machine à laver',
            origin: CUISINE_ORIGIN,
            volume: 0.4
          },
          carton_cuisine: {
            imgSrc: 'carton',
            name: 'Carton',
            origin: CUISINE_ORIGIN,
            volume: 0.1
          }
        },
        Chambre: {
          lit_simple: {
            imgSrc: 'lit_simple',
            name: 'Lit simple',
            origin: CHAMBRE_ORIGIN,
            volume: 1
          },
          lit_double: {
            imgSrc: 'lit_double',
            name: 'Lit double',
            origin: CHAMBRE_ORIGIN,
            volume: 2
          },
          armoire: {
            imgSrc: 'armoire',
            name: 'Armoire',
            origin: CHAMBRE_ORIGIN,
            volume: 0.8
          },
          commode: {
            imgSrc: 'commode',
            name: 'Commode',
            origin: CHAMBRE_ORIGIN,
            volume: 0.5
          },
          bureau: {
            imgSrc: 'bureau',
            name: 'Bureau',
            origin: CHAMBRE_ORIGIN,
            volume: 0.6
          },
          chaise: {
            imgSrc: 'chaise',
            name: 'Chaise',
            origin: CHAMBRE_ORIGIN,
            volume: 0.3
          },
          valise: {
            imgSrc: 'valise',
            name: 'Valise',
            origin: CHAMBRE_ORIGIN,
            volume: 0.1
          },
          carton_chambre: {
            imgSrc: 'carton',
            name: 'Carton',
            origin: CHAMBRE_ORIGIN,
            volume: 0.1
          },
        },
      }

      let prices = {
        '0.5': {
          demenageurs: 1,
          transport_floor: 86,
          transport_downstairs: 71,
          transport_storage: 29,
        },
        '1.5': {
          demenageurs: 2,
          transport_floor: 140,
          transport_downstairs: 84,
          transport_storage: 43,
        },
        '3': {
          demenageurs: 2,
          transport_floor: 164,
          transport_downstairs: 98,
          transport_storage: 62,
        },
        '6': {
          demenageurs: 2,
          transport_floor: 188,
          transport_downstairs: 112,
          transport_storage: 104,
        },
        '9': {
          demenageurs: 3,
          transport_floor: 301,
          transport_downstairs: 147,
          transport_storage: 139,
        },
        '12': {
          demenageurs: 3,
          transport_floor: 400,
          transport_downstairs: 193,
          transport_storage: 178,
        },
        '15': {
          demenageurs: 3,
          transport_floor: 560,
          transport_downstairs: 268,
          transport_storage: 218,
        },
        '18': {
          demenageurs: 4,
          transport_floor: 612,
          transport_downstairs: 292,
          transport_storage: 257,
        },
        '21': {
          demenageurs: 4,
          transport_floor: 671,
          transport_downstairs: 320,
          transport_storage: 297,
        },
        '24': {
          demenageurs: 4,
          transport_floor: 743,
          transport_downstairs: 354,
          transport_storage: 337,
        },
        '27': {
          demenageurs: 4,
          transport_floor: 835,
          transport_downstairs: 397,
          transport_storage: 376,
        },
        '30': {
          demenageurs: 4,
          transport_floor: 952,
          transport_downstairs: 452,
          transport_storage: 416,
        }
      }

      const createForm = () => {
        return {
          firstName: null,
          lastName: null,
          phone: null,
          mail: null,
          helpNeeded: null,
          insurance: null,
          // quantities: {},
          volume: 0, // indice de volumes
          // spaceSelector: null,
          transport: null
        }
      }

      let formPlugin = Vue.observable({
        form: createForm(),
        model: formModel,
        prices
      })

      formPlugin.getForm = () => {
        return formPlugin.form
      }

      formPlugin.pushQuantities = (item, isAdding) => {
        if (!formPlugin.form.quantities) {
          if (formPlugin.form.volume > 0) {
            Vue.set(formPlugin.form, 'volume', 0)
          }
          Vue.set(formPlugin.form, 'quantities', {})
        }
        let quantities = formPlugin.form.quantities

        if (item.value === 0) {
          Vue.delete(quantities, item.model)
          if (!Object.values(quantities).length) {
            Vue.delete(formPlugin.form, 'quantities')
          }
          return
        }
        Vue.set(quantities, item.model, item)
      }

      formPlugin.resetForm = () => {
        Vue.delete(formPlugin.form, 'spaceSelector')
        Vue.delete(formPlugin.form, 'quantities')
        Vue.set(formPlugin.form, 'volume', 0)
      }

      formPlugin.updateForm = (model, value) => {
        if (model === 'spaceSelector') {
          if (value.volume) {
            Vue.set(formPlugin.form, 'volume', value.volume)
          }
        }
        Vue.set(formPlugin.form, model, value)
      }

      Vue.prototype.$formPlugin = function () {
        return formPlugin
      }
    }
  }
}