import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  IconButton,
  Avatar,
  Divider,
  Tooltip,
  Collapse,
} from "@mui/material";
import {
  DashboardOutlined as HomeIcon,
  ListAltTwoTone as TicketIcon,
  PieChartOutlined,
  ChevronLeft,
  ChevronRight,
  Group as KontingenIcon,
  ExpandMore,
  ExpandLess,
} from "@mui/icons-material";
import { useLocation, Link } from "react-router-dom";
import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";

// Daftar kontingen
const KONTINGEN_LIST = [
  "Kontingen ADH",
  "Kontingen ASC",
  "Kontingen BC",
  "Kontingen BM",
  "Kontingen PDH",
  "Kontingen SDH",
  "Kontingen SM",
];

interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

export const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const [kontingenOpen, setKontingenOpen] = useState(false);

  const toggleDrawer = () => setIsSidebarOpen(!isSidebarOpen);

  const toggleKontingen = () => setKontingenOpen(!kontingenOpen);

  const isActive = (path: string) => location.pathname === path;

  const isKontingenActive = KONTINGEN_LIST.some(
    (kontingen) =>
      location.pathname === `/kontingen/${encodeURIComponent(kontingen)}`
  );

  const drawerWidth = 240;

  return (
    <Box sx={{ display: "flex", position: "relative" }}>
      <IconButton
        onClick={toggleDrawer}
        sx={{
          position: "fixed",
          top: 70,
          left: isSidebarOpen ? drawerWidth - 16 : 56,
          zIndex: 2,
          backgroundColor: "white",
          border: "1px solid #ccc",
          "&:hover": { backgroundColor: "#f0f0f0" },
          transition: "left 0.3s",
        }}
      >
        {isSidebarOpen ? <ChevronLeft /> : <ChevronRight />}
      </IconButton>
      <Drawer
        variant="permanent"
        sx={{
          width: isSidebarOpen ? drawerWidth : 72,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: isSidebarOpen ? drawerWidth : 72,
            boxSizing: "border-box",
            transition: "width 0.3s",
            overflowX: "hidden",
            background: "linear-gradient(to bottom, #1e1e2f, #2b2b3c)",
            color: "#e0e0e0",
            position: "fixed",
            height: "100vh",
            top: 0,
            left: 0,
            zIndex: 1,
            "& .MuiListItemIcon-root": {
              color: "#ffd500",
              minWidth: 0,
              justifyContent: "center",
            },
            "& .MuiListItemText-primary": {
              color: "#e0e0e0",
              fontWeight: 500,
            },
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: isSidebarOpen ? "row" : "column",
            justifyContent: "center",
            px: 2,
            py: 2,
            textAlign: "center",
          }}
        >
          <Box
            sx={{
              backgroundColor: "#fff",
              height: isSidebarOpen ? 55 : 45,
              width: isSidebarOpen ? 55 : 45,
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              transition: "all 0.3s ease",
            }}
          >
            <Avatar
              alt="Syahril Sabirin"
              src="/Images/LogoUT.png"
              sx={{
                width: isSidebarOpen ? 40 : 32,
                height: isSidebarOpen ? 40 : 32,
                transition: "all 0.3s ease",
              }}
            />
          </Box>
          {isSidebarOpen && (
            <Box sx={{ ml: 2 }}>
              <Typography variant="body1" sx={{ color: "#fff" }}>
                DSL
              </Typography>
              <Typography variant="body2" sx={{ color: "#fff" }}>
                Absen
              </Typography>
            </Box>
          )}
        </Box>
        <Divider sx={{ bgcolor: "rgba(255, 255, 255, 0.1)" }} />
        <List>
          {[
            {
              icon: <PieChartOutlined />,
              text: "Kontingen Chart",
              path: "/chart",
            },
            {
              icon: <KontingenIcon />,
              text: "Kontingen",
              path: "#",
              isCollapsible: true,
            },
            {
              icon: <TicketIcon />,
              text: "Register Employee",
              path: "/register",
            },
          ].map(({ icon, text, path, isCollapsible }, index) => (
            <Box key={text}>
              <ListItem disablePadding>
                {isSidebarOpen ? (
                  <ListItemButton
                    component={isCollapsible ? "button" : Link}
                    to={isCollapsible ? undefined : path}
                    onClick={isCollapsible ? toggleKontingen : undefined}
                    selected={
                      isActive(path) || (isCollapsible && isKontingenActive)
                    }
                    sx={{
                      justifyContent: "initial",
                      backgroundColor:
                        isActive(path) || (isCollapsible && isKontingenActive)
                          ? "rgba(255, 213, 0, 0.15)"
                          : "transparent",
                      borderLeft:
                        isActive(path) || (isCollapsible && isKontingenActive)
                          ? "4px solid #ffd500"
                          : "4px solid transparent",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText primary={text} sx={{ ml: 1 }} />
                    {isCollapsible && (
                      <ListItemIcon sx={{ ml: "auto" }}>
                        {kontingenOpen ? (
                          <ExpandLess sx={{ color: "#ffd500" }} />
                        ) : (
                          <ExpandMore sx={{ color: "#ffd500" }} />
                        )}
                      </ListItemIcon>
                    )}
                  </ListItemButton>
                ) : (
                  <Tooltip title={text} placement="right">
                    <ListItemButton
                      component={isCollapsible ? "button" : Link}
                      to={isCollapsible ? undefined : path}
                      onClick={
                        isCollapsible ? () => setIsSidebarOpen(true) : undefined
                      }
                      selected={
                        isActive(path) || (isCollapsible && isKontingenActive)
                      }
                      sx={{
                        justifyContent: "center",
                        backgroundColor:
                          isActive(path) || (isCollapsible && isKontingenActive)
                            ? "rgba(255, 213, 0, 0.15)"
                            : "transparent",
                        borderLeft:
                          isActive(path) || (isCollapsible && isKontingenActive)
                            ? "4px solid #ffd500"
                            : "4px solid transparent",
                        transition: "all 0.3s ease",
                      }}
                    >
                      <ListItemIcon>{icon}</ListItemIcon>
                    </ListItemButton>
                  </Tooltip>
                )}
              </ListItem>
              {isCollapsible && isSidebarOpen && (
                <Collapse in={kontingenOpen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {KONTINGEN_LIST.map((kontingen) => (
                      <ListItem disablePadding key={kontingen}>
                        <ListItemButton
                          component={Link}
                          to={`/kontingen/${encodeURIComponent(kontingen)}`}
                          selected={isActive(
                            `/kontingen/${encodeURIComponent(kontingen)}`
                          )}
                          sx={{
                            pl: 4, // Indentasi untuk sub-menu
                            justifyContent: "initial",
                            backgroundColor: isActive(
                              `/kontingen/${encodeURIComponent(kontingen)}`
                            )
                              ? "rgba(255, 213, 0, 0.15)"
                              : "transparent",
                            borderLeft: isActive(
                              `/kontingen/${encodeURIComponent(kontingen)}`
                            )
                              ? "4px solid #ffd500"
                              : "4px solid transparent",
                            transition: "all 0.3s ease",
                          }}
                        >
                          <ListItemIcon>
                            <KontingenIcon />
                          </ListItemIcon>
                          <ListItemText primary={kontingen} sx={{ ml: 1 }} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              )}
            </Box>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};
