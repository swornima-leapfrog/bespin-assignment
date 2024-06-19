import React from "react";
import Card from "@mui/material/Card";
import { CardActionArea } from "@mui/material";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";

interface CardProps {
  title: string;
  content: string;
  width?: number;
  author?: string;
  children?: React.ReactNode;
}
export default function ActionAreaCard(props: CardProps) {
  const { title, content, width, children, author } = props;
  return (
    <Card
      sx={{
        marginBlock: "2rem",
        width: { width }
      }}
    >
      <CardActionArea>
        {author && (
          <h3 className="text-right mr-6 mt-4 font-semibold text-sm">
            Blog by: {author}
          </h3>
        )}
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {content}
          </Typography>
          {children && <>{children}</>}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
