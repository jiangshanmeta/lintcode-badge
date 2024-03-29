import {
    FormControl,
    FormLabel,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@material-ui/core";
import { Dispatch, FC, SetStateAction } from "react";
import { Badge, ContentPresetName, contentPresets, DEFAULT_BADGE } from "../utils/badge";

const BadgeContent: FC<{
  badge: Badge;
  setBadge: Dispatch<SetStateAction<Badge>>;
}> = ({ badge, setBadge }) => (
    <FormControl component="fieldset">
        <FormLabel component="legend">Content</FormLabel>
        <FormControl style={{ marginTop: "16px" }}>
            <InputLabel id="badge-content-preset-label">Preset</InputLabel>
            <Select
                labelId="badge-content-preset-label"
                id="badge-content-preset-select"
                onChange={({ target: { value } }) => {
                    if (value === "custom") {
                        setBadge((b) => ({
                            ...b,
                            contentPreset: "custom",
                        }));
                    } else {
                        const v = value as ContentPresetName;
                        setBadge((b) => ({
                            ...b,
                            contentPreset: v,
                            label: contentPresets[v].badgeLabel,
                            value: v,
                        }));
                    }
                }}
                label="Preset"
                defaultValue={DEFAULT_BADGE.contentPreset}
                autoWidth={true}
            >
                {Object.entries(contentPresets).map(
                    ([option, { presetLabel: display }]) => (
                        <MenuItem value={option} key={option}>
                            {display}
                        </MenuItem>
                    )
                )}
                <MenuItem value="custom">
                    <em>Custom</em>
                </MenuItem>
            </Select>
        </FormControl>
        <TextField
            id="badge-label"
            label="Label"
            value={badge.label}
            onChange={(e) => setBadge((b) => ({ ...b, label: e.target.value }))}
            disabled={badge.contentPreset !== "custom"}
            style={{ marginTop: "24px" }}
        />
        <FormControl style={{ marginTop: "24px" }}>
            <InputLabel id="badge-value-label">Displayed value</InputLabel>
            <Select
                labelId="badge-value-label"
                id="badge-value-select"
                value={badge.value}
                onChange={(e) =>
                    setBadge((b) => ({
                        ...b,
                        value: e.target.value as keyof typeof contentPresets,
                    }))
                }
                label="Displayed value"
                defaultValue={badge.contentPreset}
                autoWidth={true}
                disabled={badge.contentPreset !== "custom"}
            >
                {Object.entries(contentPresets).map(
                    ([option, { badgeValueDisplay }]) => (
                        <MenuItem value={option} key={option}>
                            {badgeValueDisplay}
                        </MenuItem>
                    )
                )}
            </Select>
        </FormControl>
    </FormControl>
);

export default BadgeContent;
