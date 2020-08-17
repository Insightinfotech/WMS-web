import Vue from "vue"
import {
  Button,
  Tabs,
  Container,
  Header,
  Aside,
  Main,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Card,
  Form,
  FormItem,
  Input,
  InputNumber,
  RadioGroup,
  Radio,
  Switch,
  DatePicker,
  Checkbox,
  Divider,
  Select,
  Option,
  OptionGroup,
  Transfer,
  Message,
  Table,
  TableColumn,
  Alert,
  TabPane,
  Pagination,
  MessageBox,
  Dialog,
  Notification,
  Tag,
  CheckboxButton,
  CheckboxGroup,
  Cascader 
  
} from "element-ui"
Vue.use(Button)
  .use(Tabs)
  .use(Container)
  .use(Header)
  .use(Aside)
  .use(Main)
  .use(Menu)
  .use(Submenu)
  .use(MenuItem)
  .use(MenuItemGroup)
  .use(Card)
  .use(Form)
  .use(FormItem)
  .use(Input)
  .use(InputNumber)
  .use(RadioGroup)
  .use(Radio)
  .use(Switch)
  .use(DatePicker)
  .use(Checkbox)
  .use(Divider)
  .use(Select)
  .use(Option)
  .use(OptionGroup)
  .use(Transfer)
  .use(Table)
  .use(TableColumn)
  .use(Alert)
  .use(TabPane)
  .use(Pagination)
  .use(Dialog)
  .use(Tag)
  .use(CheckboxButton)
  .use(CheckboxGroup)
  .use(Cascader)






Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$notify = Notification
