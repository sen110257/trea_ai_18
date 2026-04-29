import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './store'
import './styles/index.less'
import 'vant/lib/index.css'
import { Button, Icon, Swipe, SwipeItem, Tabbar, TabbarItem, NavBar, Search, Cell, CellGroup, Card, List, PullRefresh, Image as VanImage, Popup, Picker, Calendar, Area, Tag, Rate, Stepper, Checkbox, CheckboxGroup, Radio, RadioGroup, Uploader, ActionSheet, Dialog, Toast, Notify, Loading, Empty, Divider, Badge, Overlay, Lazyload, Tabs, Tab, Field } from 'vant'

const app = createApp(App)

app.use(router)
app.use(pinia)
app.use(Button)
app.use(Icon)
app.use(Swipe)
app.use(SwipeItem)
app.use(Tabbar)
app.use(TabbarItem)
app.use(NavBar)
app.use(Search)
app.use(Cell)
app.use(CellGroup)
app.use(Card)
app.use(List)
app.use(PullRefresh)
app.use(VanImage)
app.use(Popup)
app.use(Picker)
app.use(Calendar)
app.use(Area)
app.use(Tag)
app.use(Rate)
app.use(Stepper)
app.use(Checkbox)
app.use(CheckboxGroup)
app.use(Radio)
app.use(RadioGroup)
app.use(Uploader)
app.use(ActionSheet)
app.use(Dialog)
app.use(Toast)
app.use(Notify)
app.use(Loading)
app.use(Empty)
app.use(Divider)
app.use(Badge)
app.use(Overlay)
app.use(Lazyload)
app.use(Tabs)
app.use(Tab)
app.use(Field)

app.mount('#app')
