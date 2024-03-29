import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  List,
  ListItem,
  Toolbar,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { CiBoxList, CiCircleAlert, CiCircleList } from "react-icons/ci";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { RiTeamLine } from "react-icons/ri";
import { useState } from "react";
import CustomLink from "./CustomLink";
import { WEBLINKS } from "../store/constants/WebLinks";
import { IoPersonAddOutline } from "react-icons/io5";
import { PiUsersThree } from "react-icons/pi";

const expandIcon = <ExpandMoreIcon />;

const listItems = [
  {
    icon: <MdOutlineAdminPanelSettings />,
    summary: "Admin Management",
    children: [
      {
        icon: <PiUsersThree />,
        link: "User List",
        path: WEBLINKS.ADMIN_ALL_USERS,
      },
      {
        icon: <IoPersonAddOutline />,
        link: "Create Admin",
        path: WEBLINKS.ADMIN_CREATE,
      },
    ],
  },
  {
    icon: <RiTeamLine />,
    summary: "Team Management",
    children: [
      {
        icon: <CiBoxList />,
        link: "Team List",
        path: WEBLINKS.ADMIN_ALL_TEAMS,
      },
    ],
  },
];

function AdminSideBar() {
  const [expanded, setExpanded] = useState(false);
  const handleChange = (panel) => (e, isEpanded) => {
    setExpanded(isEpanded ? panel : false);
  };
  return (
    <div>
      <Toolbar />
      <Divider />
      {listItems.map((item, index) => (
        <Accordion
          key={index}
          className="w-full text-lg"
          expanded={expanded === `panel_${index}`}
          onChange={handleChange(`panel_${index}`)}
          disableGutters
        >
          <AccordionSummary
            expandIcon={expandIcon}
            aria-controls={"acc" + index + "content"}
            id={"acc" + index + "header"}
            sx={{ color: "#26bb98" }}
          >
            <div className="px-2">{item.icon || <CiCircleList />}</div>
            <Typography fontWeight="bold">{item.summary}</Typography>
          </AccordionSummary>

          <AccordionDetails>
            <List>
              {item.children.map((child, childIndex) => (
                <ListItem key={"child_" + childIndex} disablePadding>
                  <CustomLink
                    to={child.path}
                    className="w-full"
                    activeClassName="font-bold border-1-4 border-blue-500 text-green-400"
                  >
                    <div className="flex flex-row items-center">
                      <span className="px-2">
                        {child.icon || <CiCircleAlert />}
                      </span>
                      <span>{child.link}</span>
                    </div>
                  </CustomLink>
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}

export default AdminSideBar;
