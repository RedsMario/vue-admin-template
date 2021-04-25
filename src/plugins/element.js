import Vue from 'vue'
import { Button, Row, Col, Form, FormItem, Input, Message, Notification, Breadcrumb, BreadcrumbItem, Dropdown, DropdownItem, DropdownMenu, Menu, MenuItem, Scrollbar } from 'element-ui'

Vue.use(Button)
Vue.use(Row)
Vue.use(Col)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Dropdown)
Vue.use(DropdownItem)
Vue.use(DropdownMenu)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Scrollbar)

Vue.prototype.$message = Message
Vue.prototype.$notify = Notification
