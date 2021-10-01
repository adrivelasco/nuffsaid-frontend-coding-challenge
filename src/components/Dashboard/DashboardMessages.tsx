import { Box, BoxProps } from "@mui/material";

import { useMessagesContext } from "../../context/MessagesProvider";
import { Entry } from "../Entry";
import { Group } from "../Group";

export const DashboardMessages = (props: BoxProps) => {
  const { entriesByGroup, removeEntry } = useMessagesContext();

  return (
    <Box display="flex" py={3} data-testid="dashboard-messages" {...props}>
      {Object.keys(entriesByGroup).map((key, i) => {
        const { name, entries } = entriesByGroup[key];

        return (
          <Group
            data-testid="group"
            description={`Count: ${entries.length}`}
            key={i}
            title={`${name} Type ${i + 1}`}
            width={1 / 3}
            mr={1}
            sx={{
              "&:last-child": {
                m: 0,
              },
            }}
          >
            {entries.map(({ id, message, priority }) => {
              const handleOnClear = () => {
                removeEntry({ id, priority });
              };

              return (
                <Entry
                  data-testid="entry"
                  key={id}
                  mb={1}
                  onClear={handleOnClear}
                  priority={priority}
                >
                  {message}
                </Entry>
              );
            })}
          </Group>
        );
      })}
    </Box>
  );
};
