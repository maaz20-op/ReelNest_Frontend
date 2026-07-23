import {
  Search,
  PlusIcon,
  MessageCircle,
  House,
  Sun,
  Moon,
  Lock,
  Globe,
  SendHorizontal,
} from "lucide-react";
import { GoVideo } from "react-icons/go";
import { CgProfile } from "react-icons/cg";
import { FaVolumeUp } from "react-icons/fa";
import { MdOutlineMessage } from "react-icons/md";
import { GoPlusCircle } from "react-icons/go";
import { FcGoogle } from "react-icons/fc";
import { RiLockPasswordLine } from "react-icons/ri";
import { IoSettings } from "react-icons/io5";
import { FaPencilAlt } from "react-icons/fa";
import { IoCallSharp } from "react-icons/io5";
import { FaVideo } from "react-icons/fa";
import { GiUpgrade } from "react-icons/gi";
import { FaFile } from "react-icons/fa6";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { FaUpload } from "react-icons/fa6";
import { UserX } from "lucide-react";
import { FaRegHeart } from "react-icons/fa";
import { FaRegCommentDots } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { LuSend } from "react-icons/lu";
import { CiSaveUp2 } from "react-icons/ci";
import { IoMdArrowBack } from "react-icons/io";
import { Home } from "lucide-react";
import { FaComment } from "react-icons/fa6";
import { IoIosShareAlt } from "react-icons/io";
import { FaPlay } from "react-icons/fa";
import { IoMdPause } from "react-icons/io";
import { ImLoop } from "react-icons/im";
import { FaArrowUp } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
import { RiUserFollowFill } from "react-icons/ri";
import { IoPersonAdd } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdDeleteForever } from "react-icons/md";
import { IoVolumeMute } from "react-icons/io5";

export const Icons = {
  search: Search,
  share: IoIosShareAlt,
  delete: MdDeleteForever,
  videoPreference: BsThreeDotsVertical,
  HomeIcon: House,
  LightMode: Sun,
  DarkMode: Moon,
  plus: PlusIcon,
  profile: CgProfile,
  loop: ImLoop,
  arrowUp: FaArrowUp,
  arrowDown: FaArrowDown,
  message: MessageCircle,
  play: FaPlay,
  pause: IoMdPause,
  plusCircle: GoPlusCircle,
  google: FcGoogle,
  password: RiLockPasswordLine,
  blockedUser: UserX,
  settings: IoSettings,
  pencil: FaPencilAlt,
  call: IoCallSharp,
  followIcon: IoPersonAdd,
  followedIcon: RiUserFollowFill,
  videoCall: FaVideo,
  upgrade: GiUpgrade,
  File: FaFile,
  MagicStick: FaWandMagicSparkles,
  upload: FaUpload,
  heart: FaHeart,
  comments: FaRegCommentDots,
  comments2: FaComment,
  send: SendHorizontal,
  save: CiSaveUp2,
  back: IoMdArrowBack,
  mute: IoVolumeMute,
  unmute: FaVolumeUp,
  private: Lock,
  public: Globe,
};
