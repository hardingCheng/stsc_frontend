import {
  Select,
  Option,
  OptionGroup,
  Input,
  InputNumber,
  Radio,
  Tree,
  Dialog,
  Row,
  Col,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Cascader,
  Collapse,
  CollapseItem,
  Switch,
  Slider,
  TimeSelect,
  TimePicker,
  DatePicker,
  Upload,
  Rate,
  ColorPicker,
  Transfer,
  Form,
  FormItem,
  Table,
  TableColumn,
  Tag,
  Button,
  Progress,
  Pagination,
  Badge,
  Avatar,
  Alert,
  Loading,
  Message,
  MessageBox,
  Notification,
  Menu,
  MenuItemGroup,
  MenuItem,
  Submenu,
  RadioGroup,
  RadioButton,
  Card,
  Tabs,
  TabPane,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Breadcrumb,
  BreadcrumbItem,
  Link,
  Steps,
  Step,
  Tooltip,
  Popover,
  Ul,
  InfiniteScroll,
} from "element-ui";

const element = {
  install: function (Vue) {
    Vue.use(Select);
    Vue.use(Option);
    Vue.use(OptionGroup);
    Vue.use(Input);
    Vue.use(InputNumber);
    Vue.use(Radio);
    Vue.use(Tree);
    Vue.use(Dialog);
    Vue.use(Row);
    Vue.use(Col);
    Vue.use(Checkbox);
    Vue.use(CheckboxButton);
    Vue.use(CheckboxGroup);
    Vue.use(Cascader);
    Vue.use(Collapse);
    Vue.use(CollapseItem)
    Vue.use(Switch);
    Vue.use(Slider);
    Vue.use(TimePicker);
    Vue.use(TimeSelect);
    Vue.use(DatePicker);
    Vue.use(Upload);
    Vue.use(Rate);
    Vue.use(ColorPicker);
    Vue.use(Transfer);
    Vue.use(Form);
    Vue.use(FormItem);
    Vue.use(Table);
    Vue.use(TableColumn);
    Vue.use(Tag);
    Vue.use(Button);
    Vue.use(Progress);
    Vue.use(Pagination);
    Vue.use(Badge);
    Vue.use(Avatar);
    Vue.use(Alert);
    Vue.use(Loading);
    Vue.use(Menu);
    Vue.use(MenuItem);
    Vue.use(MenuItemGroup);
    Vue.use(Submenu);
    Vue.use(RadioGroup);
    Vue.use(RadioButton);
    Vue.use(Card)
    Vue.use(Tabs)
    Vue.use(TabPane)
    Vue.use(Dropdown)
    Vue.use(DropdownMenu)
    Vue.use(DropdownItem)
    Vue.use(Breadcrumb)
    Vue.use(BreadcrumbItem)
    Vue.use(Link)
    Vue.use(Dialog)
    Vue.use(Steps)
    Vue.use(Tooltip)
    Vue.use(Step)
    Vue.use(Popover)
    Vue.use(InfiniteScroll)

    Vue.prototype.$message = Message;
    Vue.prototype.$loading = Loading;
    Vue.prototype.$confirm = MessageBox.confirm;
    Vue.prototype.$alert = MessageBox.alert;
    Vue.prototype.$prompt = MessageBox.prompt;
    Vue.prototype.$notify = Notification;
  },
};

export default element;
