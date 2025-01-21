import IC_Calendar from "/public/svgs/ic_calendar.svg";
import IC_Cancel from "/public/svgs/ic_cancel.svg";
import IC_Delete from "/public/svgs/ic_delete.svg";
import IC_Edit from "/public/svgs/ic_edit.svg";
import IC_ExpiryDate from "/public/svgs/ic_expiry_date.svg";
import IC_Eye from "/public/svgs/ic_eye.svg";
import IC_LogIn from "/public/svgs/ic_log_in.svg";
import IC_LogOut from "/public/svgs/ic_log_out.svg";
import IC_Menu from "/public/svgs/ic_menu.svg";
import IC_MoreOptions from "/public/svgs/ic_more_options.svg";
import IC_Paste from "/public/svgs/ic_paste.svg";
import IC_Plus from "/public/svgs/ic_plus.svg";
import IC_Send from "/public/svgs/ic_send.svg";
import IC_Success from "/public/svgs/ic_success.svg";

export const IconMap = {
  IC_Calendar,
  IC_Cancel,
  IC_Delete,
  IC_Edit,
  IC_ExpiryDate,
  IC_LogIn,
  IC_LogOut,
  IC_MoreOptions,
  IC_Paste,
  IC_Plus,
  IC_Send,
  IC_Success,
  IC_Menu,
  IC_Eye,
} as const;

export type IconMapTypes = keyof typeof IconMap;

export const getVariantsWithCommonClass = (
  icons: IconMapTypes[],
  commonClass: string
) => {
  return icons.reduce((acc, icon) => {
    acc[icon] = `${commonClass}`;
    return acc;
  }, {} as { [key in IconMapTypes]: string });
};

export const IconSizes = {
  lg: 40,
  md: 32,
  sm: 24,
  xs: 16,
};

export type IconSizeTypes = keyof typeof IconSizes;
