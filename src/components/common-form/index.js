import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

function CommonForm({
    action,
    formControls,
    buttonText,
    isBtnDisabled,
    btnType,
    formData,
    setFormData,
    handleFileChange,
}) {
    console.log(isBtnDisabled)
    // This function renders input fields based on the specified component type
    function renderInputByComponentType(getCurrentControl) {
        let content = null;

        switch (getCurrentControl.componentType) {
            // For input component type
            case "input":
                content = (
                    <div key={getCurrentControl.name} className="relative flex flex-col mt-8">
                        <Label htmlFor={getCurrentControl.name} className="mb-2 text-gray-700">
                            {getCurrentControl.label} {/* Label for the input */}
                        </Label>
                        <Input
                            type={getCurrentControl.inputType}
                            disabled={getCurrentControl.disabled}
                            placeholder={getCurrentControl.placeholder}
                            name={getCurrentControl.name}
                            id={getCurrentControl.name}
                            value={formData[getCurrentControl.name]}
                            onChange={(event) =>
                                setFormData({
                                    ...formData, // destructuring the form data
                                    [event.target.name]: event.target.value,
                                })
                            }
                            className="w-full rounded-md h-[50px] px-4 border dark:bg-black bg-gray-100 text-lg outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:drop-shadow-lg focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                    </div>
                );
                break;

            // For file input component type
            case "file":
                content = (
                    <Label
                        htmlFor={getCurrentControl.name}
                        key={getCurrentControl.name}
                        className="flex bg-gray-100 dark:bg-black items-center px-3 py-3 mx-auto mt-6 text-center border-2 border-dashed rounded-lg cursor-pointer"
                    >
                        <h2>{getCurrentControl.label}</h2> 
                        <Input
                            onChange={handleFileChange}
                            id={getCurrentControl.name}
                            type="file"
                        />
                    </Label>
                );
                break;

            // Default case to handle unrecognized component types
            default:
                content = (
                    <div key={getCurrentControl.name} className="relative flex flex-col mt-8">
                        <Label htmlFor={getCurrentControl.name} className="mb-2 text-gray-700">
                            {getCurrentControl.label} {/* Label for default case */}
                        </Label>
                        <Input
                            type={getCurrentControl.inputType}
                            disabled={getCurrentControl.disabled}
                            placeholder={getCurrentControl.placeholder}
                            name={getCurrentControl.name}
                            id={getCurrentControl.name}
                            value={formData[getCurrentControl.name]}
                            onChange={(event) =>
                                setFormData({
                                    ...formData,
                                    [event.target.name]: event.target.value,
                                })
                            }
                            className="w-full rounded-md h-[60px] px-4 border dark:bg-black bg-gray-100 text-lg outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:drop-shadow-lg focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                    </div>
                );
                break;
        }
        return content;
    }

    // The main form component rendering the input fields and button
    return (
        <form action={action}>
            {formControls.map((control) => renderInputByComponentType(control))}
            <div className="mt-6 w-full">
                <Button
                    type={btnType || "submit"}
                     disabled={isBtnDisabled}
                    className="disabled:opacity-60 flex h-11 items-center justify-center px-5"
                >
                    {buttonText}
                </Button>
            </div>
        </form>
    );
}

export default CommonForm;
