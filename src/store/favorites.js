import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFavoritesStore = defineStore('favorites', () => {
  const favorites = ref({
    templates: JSON.parse(localStorage.getItem('fav_templates') || '[]'),
    venues: JSON.parse(localStorage.getItem('fav_venues') || '[]'),
    staffs: JSON.parse(localStorage.getItem('fav_staffs') || '[]')
  })

  const toggleTemplate = (template) => {
    const index = favorites.value.templates.findIndex(t => t.id === template.id)
    if (index > -1) {
      favorites.value.templates.splice(index, 1)
    } else {
      favorites.value.templates.push(template)
    }
    localStorage.setItem('fav_templates', JSON.stringify(favorites.value.templates))
    return index === -1
  }

  const toggleVenue = (venue) => {
    const index = favorites.value.venues.findIndex(v => v.id === venue.id)
    if (index > -1) {
      favorites.value.venues.splice(index, 1)
    } else {
      favorites.value.venues.push(venue)
    }
    localStorage.setItem('fav_venues', JSON.stringify(favorites.value.venues))
    return index === -1
  }

  const toggleStaff = (staff) => {
    const index = favorites.value.staffs.findIndex(s => s.id === staff.id)
    if (index > -1) {
      favorites.value.staffs.splice(index, 1)
    } else {
      favorites.value.staffs.push(staff)
    }
    localStorage.setItem('fav_staffs', JSON.stringify(favorites.value.staffs))
    return index === -1
  }

  const isTemplateFavorited = (id) => {
    return favorites.value.templates.some(t => t.id === id)
  }

  const isVenueFavorited = (id) => {
    return favorites.value.venues.some(v => v.id === id)
  }

  const isStaffFavorited = (id) => {
    return favorites.value.staffs.some(s => s.id === id)
  }

  const getAllFavorites = () => {
    return [...favorites.value.templates, ...favorites.value.venues, ...favorites.value.staffs
  }

  return {
    favorites,
    toggleTemplate,
    toggleVenue,
    toggleStaff,
    isTemplateFavorited,
    isVenueFavorited,
    isStaffFavorited,
    getAllFavorites
  }
})
