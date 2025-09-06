import React, { useState } from "react";
import {
  Box,
  TextField,
  IconButton,
  Tooltip,
  Fade,
  Paper,
  MenuList,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  Chip,
  ClickAwayListener,
  Popper,
} from "@mui/material";
import {
  Send,
  Add,
  Build,
  Folder,
  Description,
  Code,
  Search,
  Image,
  Calculate,
  Web,
  Note,
  Assignment,
  Psychology,
} from "@mui/icons-material";
import { useChatInputMenu } from "../../hooks/chat/useChatInputMenu";

interface Props {
  open?: boolean;
  anchorEl: HTMLElement;
  onClose?: () => void;
}

const ChatInputMenu = ({ open = false, anchorEl, onClose }: Props) => {
  const [message, setMessage] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { menu: menuData } = useChatInputMenu();

  const handleClose = () => {
    setSelectedCategory(null);
    onClose?.();
  };

  const handleCategorySelect = (category: any) => {
    setSelectedCategory(category);
  };

  const handleItemSelect = (item: any) => {
    setMessage(`${message}[${item.name}] `);
    handleClose();
  };

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <Box>
        {/* Menú desplegable */}
        <Popper
          open={open}
          anchorEl={anchorEl}
          placement="top-start"
          transition
          sx={{ zIndex: 1300 }}
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={200}>
              <Paper
                elevation={8}
                sx={{
                  minWidth: selectedCategory ? 320 : 200,
                  maxWidth: 400,
                  mb: 1,
                  borderRadius: 2,
                  overflow: "hidden",
                }}
              >
                {!selectedCategory ? (
                  // Menú principal con categorías
                  <MenuList dense>
                    <MenuItem onClick={() => handleCategorySelect("tools")}>
                      <ListItemIcon>
                        <Build fontSize="small" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Tools"
                        secondary={`${menuData.tools.length} disponibles`}
                      />
                    </MenuItem>
                    <MenuItem onClick={() => handleCategorySelect("resources")}>
                      <ListItemIcon>
                        <Folder fontSize="small" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Resources"
                        secondary={`${menuData.resources.length} recursos`}
                      />
                    </MenuItem>
                    <MenuItem onClick={() => handleCategorySelect("prompts")}>
                      <ListItemIcon>
                        <Description fontSize="small" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Prompts"
                        secondary={`${menuData.prompts.length} plantillas`}
                      />
                    </MenuItem>
                  </MenuList>
                ) : (
                  // Submenú con elementos específicos
                  <Box>
                    <Box sx={{ p: 2, bgcolor: "background.default" }}>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                        }}
                      >
                        {selectedCategory === "tools" && (
                          <Build fontSize="small" />
                        )}
                        {selectedCategory === "resources" && (
                          <Folder fontSize="small" />
                        )}
                        {selectedCategory === "prompts" && (
                          <Description fontSize="small" />
                        )}
                        {(selectedCategory as any).charAt(0).toUpperCase() +
                          (selectedCategory as any).slice(1)}
                      </Typography>
                    </Box>
                    <Divider />
                    <MenuList dense sx={{ maxHeight: 300, overflowY: "auto" }}>
                      {(menuData[selectedCategory] as any).map(
                        (item: any, index: any) => (
                          <MenuItem
                            key={index}
                            onClick={() => handleItemSelect(item)}
                          >
                            {item.icon && (
                              <ListItemIcon>{item.icon}</ListItemIcon>
                            )}
                            <ListItemText
                              primary={item.name}
                              secondary={item.description}
                            />
                          </MenuItem>
                        )
                      )}
                    </MenuList>
                    <Divider />
                    <Box sx={{ p: 1 }}>
                      <MenuItem onClick={() => setSelectedCategory(null)} dense>
                        <ListItemText
                          primary="← Volver"
                          sx={{
                            "& .MuiListItemText-primary": {
                              fontSize: "0.875rem",
                            },
                          }}
                        />
                      </MenuItem>
                    </Box>
                  </Box>
                )}
              </Paper>
            </Fade>
          )}
        </Popper>
      </Box>
    </ClickAwayListener>
  );
};

export default ChatInputMenu;
