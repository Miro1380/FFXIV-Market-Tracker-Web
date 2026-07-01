import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import { useUser } from "./UserContext";

//Used claude from design
export default function SetAlertModal({ open, onClose, item, onAlertCreated }) {
    const [targetPrice, setTargetPrice] = useState("");
    const [alertCondition, setAlertCondition] = useState("BELOW");
    const [isHq, setIsHq] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const {user} = useUser();

    //console.log("ITEM in Modal", item);

    const handleSubmit = async () => {
        const price = parseFloat(targetPrice);
        if (!targetPrice || isNaN(price) || price <= 0) {
            setError("Please enter a valid price.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const res = await fetch("/api/alerts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: user.id,
                    itemId: item.itemId,
                    world: item.world,
                    alertCondition,
                    targetPrice: price,
                    isHq,
                }),
            });

            if (!res.ok) throw new Error(`Server error: ${res.status}`);
            onAlertCreated();
            handleClose();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setTargetPrice("");
        setAlertCondition("BELOW");
        setIsHq(false);
        setError(null);
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
            <DialogTitle sx={{ fontFamily: "Cinzel, serif", color: "primary.main" }}>
                Set Price Alert
            </DialogTitle>
            <DialogContent>
                <Stack spacing={2} sx={{ mt: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                        {item?.itemName} — {item?.world}
                    </Typography>
                    <Stack spacing={0.5}>
                        <Typography variant="caption" color="text.secondary">
                            Alert condition
                        </Typography>
                        <ToggleButtonGroup
                            exclusive
                            value={alertCondition}
                            onChange={(_, val) => val && setAlertCondition(val)}
                            size="small"
                            fullWidth
                        >
                            <ToggleButton value="BELOW" sx={{ flex: 1 }}>
                                Price drops below
                            </ToggleButton>
                            <ToggleButton value="ABOVE" sx={{ flex: 1 }}>
                                Price rises above
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Stack>
                    <TextField
                        label="Target price (gil)"
                        type="number"
                        value={targetPrice}
                        onChange={(e) => setTargetPrice(e.target.value)}
                        slotProps={{ min: 1, step: 1 }}
                        fullWidth
                        autoFocus
                    />
                    {item?.canBeHq && (
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={isHq}
                                    onChange={(e) => setIsHq(e.target.checked)}
                                    color="primary"
                                />
                            }
                            label="HQ only"
                        />
                    )}
                    {error && <Alert severity="error">{error}</Alert>}
                </Stack>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button onClick={handleClose} disabled={loading}>
                    Cancel
                </Button>
                <Button variant="contained" onClick={handleSubmit} disabled={loading}>
                    {loading ? "Saving…" : "Create alert"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}