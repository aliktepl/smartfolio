import {ModeToggle} from "@/components/mode-toggle.tsx";

function Settings() {
    return(
        <div className="flex items-center gap-1 m-4">
            Choose Mode: <ModeToggle />
        </div>
    )
}

export default Settings;