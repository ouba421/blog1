import Vue from "vue";
import {
  Button,
  Message,
  MessageBox,
  Loading,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Avatar,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  InfiniteScroll,
  Form,
  FormItem,
  Input,
  Row,
  Col,
  Select,
  Option,
  Table,
  TableColumn,
  Pagination,
  Radio,
  RadioGroup,
  Upload
} from "element-ui";
import "@/styles/element-variables.scss";

// 按需引入组件
Vue.use(Button);
Vue.use(Loading.directive);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Avatar);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(InfiniteScroll);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Row);
Vue.use(Col);
Vue.use(Select);
Vue.use(Option);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Pagination);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Upload);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;
