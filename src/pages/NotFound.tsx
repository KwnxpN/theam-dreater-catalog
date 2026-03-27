import { Button } from "@/components/ui/button"
import { NavLink } from "react-router-dom"

const NotFound = () => {
    return (
        <div className="min-h-[90vh] flex flex-col gap-8 items-center justify-center text-center">
            <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
            <p className="text-lg text-gray-600">The page you are looking for does not exist.</p>
            <NavLink to="/">
                <Button variant="default" className="p-6">
                    Go Back Home
                </Button>
            </NavLink>
        </div>
    )
}

export default NotFound