import { styled } from "@mui/material/styles";

const drawerWidth = 280;
export const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
    ({ theme, open }) => ({
      flexGrow: 1,
      height: 'calc(100vh - 120px)', 
      width: '95%',
      padding: theme.spacing(3),
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      marginLeft: '0px',
      ...(open && {
        transition: theme.transitions.create("margin", {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen
        }),
        marginLeft: `${drawerWidth}px`,
        width: 'calc(95% - 280px)',
      })
    })
  );