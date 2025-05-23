// "use client"

// import type React from "react"

// import { useState, useCallback } from "react"
// import { AppSidebar } from "@/components/app-sidebar"
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb"
// import { Separator } from "@/components/ui/separator"
// import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
// import Goals from "../Cards/Goals"
// import Disclaimer from "../Cards/Disclaimer"
// import ThemeController from "../ThemeController/themeController"
// import { SignOutButton } from "@clerk/nextjs"
// import { motion } from "framer-motion"
// import { Button } from "@/components/ui/button"
// import {
//   ChevronDown,
//   Search,
//   Settings,
//   TrendingUp,
//   AlertCircle,
//   Home,
//   Car,
//   GraduationCap,
//   PiggyBank,
//   PlusCircle,
//   Loader2,
//   Trash2,
//   Edit,
// } from "lucide-react"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { Input } from "@/components/ui/input"
// import { Badge } from "@/components/ui/badge"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { useRouter } from "next/navigation"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
  
// } from "@/components/ui/dialog"
// import {AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger} from "@/components/ui/alert-dialog"
// import { Label } from "@/components/ui/label"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// interface Goal {
//   id: string
//   userId: string
//   title: string
//   targetAmount: number
//   adjustedTargetAmount: number
//   amountRequired: number
//   yearsToGoal: number
//   category: string
//   currentSalary: number
//   annualIncrementRate: number
//   forecastedSalary: number
//   isAchievable: boolean
//   priority: number
//   createdAt: string // ISO date string
// }

// const hardcodedGoals: Goal[] = [
//   {
//     id: "1",
//     userId: "sampleUser123",
//     title: "Dream Home in the Hills",
//     targetAmount: 8000000,
//     adjustedTargetAmount: 9500000,
//     amountRequired: 7500000,
//     yearsToGoal: 10,
//     category: "realEstate",
//     currentSalary: 1800000,
//     annualIncrementRate: 0.07,
//     forecastedSalary: 3540720,
//     isAchievable: true,
//     priority: 1,
//     createdAt: "2023-01-15T10:00:00Z",
//   },
//   {
//     id: "2",
//     userId: "sampleUser123",
//     title: "Electric Vehicle Purchase",
//     targetAmount: 2200000,
//     adjustedTargetAmount: 2500000,
//     amountRequired: 2000000,
//     yearsToGoal: 3,
//     category: "automobile",
//     currentSalary: 1800000,
//     annualIncrementRate: 0.07,
//     forecastedSalary: 2205000,
//     isAchievable: true,
//     priority: 2,
//     createdAt: "2023-05-20T14:30:00Z",
//   },
//   {
//     id: "3",
//     userId: "sampleUser123",
//     title: "Child's Higher Education Fund",
//     targetAmount: 5000000,
//     adjustedTargetAmount: 6500000,
//     amountRequired: 4500000,
//     yearsToGoal: 8,
//     category: "education",
//     currentSalary: 1800000,
//     annualIncrementRate: 0.07,
//     forecastedSalary: 3092880,
//     isAchievable: false,
//     priority: 3,
//     createdAt: "2023-08-10T09:15:00Z",
//   },
//   {
//     id: "4",
//     userId: "sampleUser123",
//     title: "World Tour Adventure",
//     targetAmount: 1500000,
//     adjustedTargetAmount: 1700000,
//     amountRequired: 1200000,
//     yearsToGoal: 5,
//     category: "general",
//     currentSalary: 1800000,
//     annualIncrementRate: 0.07,
//     forecastedSalary: 2524500,
//     isAchievable: true,
//     priority: 4,
//     createdAt: "2024-01-05T18:00:00Z",
//   },
//   {
//     id: "5",
//     userId: "sampleUser123",
//     title: "Early Retirement Fund",
//     targetAmount: 20000000, // 2 Crore
//     adjustedTargetAmount: 30000000,
//     amountRequired: 18000000,
//     yearsToGoal: 15,
//     category: "general",
//     currentSalary: 1800000,
//     annualIncrementRate: 0.07,
//     forecastedSalary: 5000000, // Simplified example
//     isAchievable: true,
//     priority: 2,
//     createdAt: "2022-11-01T12:00:00Z",
//   },
// ]

// // Format currency in Indian Rupees
// const formatCurrency = (amount: number) => {
//   return new Intl.NumberFormat("en-IN", {
//     style: "currency",
//     currency: "INR",
//     maximumFractionDigits: 0,
//   }).format(amount)
// }

// const getCategoryColor = (category: string): string => {
//   switch (category.toLowerCase()) {
//     case "realestate":
//       return "bg-purple-500"
//     case "automobile":
//       return "bg-blue-500"
//     case "education":
//       return "bg-amber-500"
//     case "general":
//       return "bg-teal-500"
//     default:
//       return "bg-emerald-500"
//   }
// }

// // Get icon based on category (using Lucide icons for consistency)
// const getCategoryIcon = (category: string): React.ReactNode => {
//   switch (category.toLowerCase()) {
//     case "realestate":
//       return <Home className="h-6 w-6" />
//     case "automobile":
//       return <Car className="h-6 w-6" />
//     case "education":
//       return <GraduationCap className="h-6 w-6" />
//     case "general":
//       return <PiggyBank className="h-6 w-6" />
//     default:
//       return <PiggyBank className="h-6 w-6" /> // Default icon
//   }
// }

// // Available categories for filtering
// const categories = ["All", "realEstate", "automobile", "education", "general"]

// // Format category name for display
// const formatCategoryName = (category: string): string => {
//   if (!category) return "Unknown"
//   // SimpleCamelCase to Title Case
//   const result = category.replace(/([A-Z])/g, " $1")
//   return result.charAt(0).toUpperCase() + result.slice(1)
// }

// export default function GoalSidebar() {
//   const [searchQuery, setSearchQuery] = useState("")
//   const [activeCategory, setActiveCategory] = useState("All")
//   const [goals, setGoals] = useState<Goal[]>(hardcodedGoals)
//   const [isAddGoalOpen, setIsAddGoalOpen] = useState(false)
//   const [isModifyGoalOpen, setIsModifyGoalOpen] = useState(false)
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null)
//   const [newGoal, setNewGoal] = useState({
//     title: "",
//     targetAmount: "",
//     yearsToGoal: "",
//     category: "general",
//     priority: "3",
//     currentSalary: "1800000",
//     annualIncrementRate: "0.07",
//   })
//   const router = useRouter()

//   // Filter goals based on search and active category
//   const filteredGoals = goals.filter((goal) => {
//     const matchesSearch = goal.title.toLowerCase().includes(searchQuery.toLowerCase())
//     const matchesCategory = activeCategory === "All" || goal.category.toLowerCase() === activeCategory.toLowerCase()
//     return matchesSearch && matchesCategory
//   })

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.07,
//       },
//     },
//   }

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: { type: "spring", stiffness: 120, damping: 14 },
//     },
//   }

//   // Handle modify goal - using useCallback to ensure stable reference
//   const handleModifyGoal = useCallback((goal: Goal) => {
//     setSelectedGoal(goal)
//     setNewGoal({
//       title: goal.title,
//       targetAmount: goal.targetAmount.toString(),
//       yearsToGoal: goal.yearsToGoal.toString(),
//       category: goal.category,
//       priority: goal.priority.toString(),
//       currentSalary: goal.currentSalary.toString(),
//       annualIncrementRate: goal.annualIncrementRate.toString(),
//     })
//     setIsModifyGoalOpen(true)
//   }, [])

//   // Handle delete goal - using useCallback to ensure stable reference
//   const handleDeleteGoal = useCallback((goalId: string) => {
//     setGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== goalId))
//   }, [])

//   // Handle update goal
//   const handleUpdateGoal = useCallback(() => {
//     if (!selectedGoal) return

//     setIsSubmitting(true)

//     // Simulate a delay for API call
//     setTimeout(() => {
//       const targetAmount = Number.parseFloat(newGoal.targetAmount) || 0
//       const yearsToGoal = Number.parseInt(newGoal.yearsToGoal) || 1
//       const currentSalary = Number.parseFloat(newGoal.currentSalary) || 1800000
//       const annualIncrementRate = Number.parseFloat(newGoal.annualIncrementRate) || 0.07

//       // Calculate forecasted salary
//       const forecastedSalary = currentSalary * Math.pow(1 + annualIncrementRate, yearsToGoal)

//       // Simple calculation for adjusted target amount (with inflation)
//       const adjustedTargetAmount = targetAmount * Math.pow(1.06, yearsToGoal) // Assuming 6% inflation

//       // Determine if goal is achievable (simple logic)
//       const isAchievable = forecastedSalary * 0.3 * yearsToGoal >= targetAmount

//       // Update the goal
//       setGoals((prevGoals) =>
//         prevGoals.map((goal) => {
//           if (goal.id === selectedGoal.id) {
//             return {
//               ...goal,
//               title: newGoal.title,
//               targetAmount: targetAmount,
//               adjustedTargetAmount: adjustedTargetAmount,
//               amountRequired: targetAmount,
//               yearsToGoal: yearsToGoal,
//               category: newGoal.category,
//               currentSalary: currentSalary,
//               annualIncrementRate: annualIncrementRate,
//               forecastedSalary: forecastedSalary,
//               isAchievable: isAchievable,
//               priority: Number.parseInt(newGoal.priority),
//             }
//           }
//           return goal
//         }),
//       )

//       setIsModifyGoalOpen(false)
//       setIsSubmitting(false)
//       setSelectedGoal(null)
//     }, 1000)
//   }, [selectedGoal, newGoal])

//   // Handle input change for new goal form
//   const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target
//     setNewGoal((prev) => ({ ...prev, [name]: value }))
//   }, [])

//   // Handle select change for new goal form
//   const handleSelectChange = useCallback((name: string, value: string) => {
//     setNewGoal((prev) => ({ ...prev, [name]: value }))
//   }, [])

//   // Handle add new goal
//   const handleAddGoal = useCallback(() => {
//     setIsSubmitting(true)

//     // Simulate a delay for API call
//     setTimeout(() => {
//       // Generate a new ID (in a real app, this would be handled by the backend)
//       const newId = `new-${Date.now()}`

//       const targetAmount = Number.parseFloat(newGoal.targetAmount) || 0
//       const yearsToGoal = Number.parseInt(newGoal.yearsToGoal) || 1
//       const currentSalary = Number.parseFloat(newGoal.currentSalary) || 1800000
//       const annualIncrementRate = Number.parseFloat(newGoal.annualIncrementRate) || 0.07

//       // Calculate forecasted salary
//       const forecastedSalary = currentSalary * Math.pow(1 + annualIncrementRate, yearsToGoal)

//       // Simple calculation for adjusted target amount (with inflation)
//       const adjustedTargetAmount = targetAmount * Math.pow(1.06, yearsToGoal) // Assuming 6% inflation

//       // Determine if goal is achievable (simple logic)
//       const isAchievable = forecastedSalary * 0.3 * yearsToGoal >= targetAmount

//       // Create a new goal object
//       const goalToAdd: Goal = {
//         id: newId,
//         userId: "sampleUser123",
//         title: newGoal.title,
//         targetAmount: targetAmount,
//         adjustedTargetAmount: adjustedTargetAmount,
//         amountRequired: targetAmount,
//         yearsToGoal: yearsToGoal,
//         category: newGoal.category,
//         currentSalary: currentSalary,
//         annualIncrementRate: annualIncrementRate,
//         forecastedSalary: forecastedSalary,
//         isAchievable: isAchievable,
//         priority: Number.parseInt(newGoal.priority),
//         createdAt: new Date().toISOString(),
//       }

//       // Add the new goal to the list
//       setGoals((prevGoals) => [goalToAdd, ...prevGoals])

//       // Reset the form
//       setNewGoal({
//         title: "",
//         targetAmount: "",
//         yearsToGoal: "",
//         category: "general",
//         priority: "3",
//         currentSalary: "1800000",
//         annualIncrementRate: "0.07",
//       })

//       // Close the dialog
//       setIsAddGoalOpen(false)
//       setIsSubmitting(false)
//     }, 1000)
//   }, [newGoal])

//   return (
//     <SidebarProvider>
//       <AppSidebar />
//       <SidebarInset>
//         {/* Enhanced Header with Glass Effect */}
//         <header className="sticky top-0 flex h-16 shrink-0 items-center justify-between px-4 bg-background/80 backdrop-blur-md border-b z-30">
//           <div className="flex items-center gap-3">
//             <SidebarTrigger className="text-muted-foreground hover:text-foreground transition-colors" />
//             <Separator orientation="vertical" className="h-6" />
//             <Breadcrumb>
//               <BreadcrumbList>
//                 <BreadcrumbItem className="hidden md:block">
//                   <BreadcrumbLink href="/user/dashboard" className="text-muted-foreground hover:text-foreground">
//                     Dashboard
//                   </BreadcrumbLink>
//                 </BreadcrumbItem>
//                 <BreadcrumbSeparator className="hidden md:block text-muted-foreground/50" />
//                 <BreadcrumbItem>
//                   <BreadcrumbPage className="font-medium">Goals Universe</BreadcrumbPage>
//                 </BreadcrumbItem>
//               </BreadcrumbList>
//             </Breadcrumb>
//           </div>

//           <div className="flex items-center gap-3">
//             <div className="relative hidden md:flex">
//               <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//               <Input
//                 type="search"
//                 placeholder="Search goals..."
//                 className="w-[200px] pl-8 rounded-full bg-muted/50 border-none focus-visible:ring-1 focus-visible:ring-primary/50"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//             </div>

//             {/* Add Goal Button */}
//             <Dialog open={isAddGoalOpen} onOpenChange={setIsAddGoalOpen}>
//               <DialogTrigger asChild>
//                 <Button variant="default" size="sm" className="flex items-center gap-1.5">
//                   <PlusCircle className="h-4 w-4" />
//                   <span>Add Goal</span>
//                 </Button>
//               </DialogTrigger>
//               <DialogContent className="sm:max-w-[425px]">
//                 <DialogHeader>
//                   <DialogTitle>Create New Goal</DialogTitle>
//                   <DialogDescription>
//                     Enter the details for your new financial goal. You can edit more details later.
//                   </DialogDescription>
//                 </DialogHeader>
//                 <div className="grid gap-4 py-4">
//                   <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="title" className="text-right">
//                       Goal Title
//                     </Label>
//                     <div className="col-span-3">
//                       <Input
//                         id="title"
//                         name="title"
//                         placeholder="Dream Home, New Car, etc."
//                         className="w-full"
//                         value={newGoal.title}
//                         onChange={handleInputChange}
//                       />
//                       {newGoal.title && (
//                         <p className="mt-1 text-xs text-muted-foreground break-words">{newGoal.title}</p>
//                       )}
//                     </div>
//                   </div>
//                   <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="targetAmount" className="text-right">
//                       Target Amount
//                     </Label>
//                     <Input
//                       id="targetAmount"
//                       name="targetAmount"
//                       placeholder="500000"
//                       type="number"
//                       className="col-span-3"
//                       value={newGoal.targetAmount}
//                       onChange={handleInputChange}
//                     />
//                   </div>
//                   <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="yearsToGoal" className="text-right">
//                       Years to Goal
//                     </Label>
//                     <Input
//                       id="yearsToGoal"
//                       name="yearsToGoal"
//                       placeholder="5"
//                       type="number"
//                       className="col-span-3"
//                       value={newGoal.yearsToGoal}
//                       onChange={handleInputChange}
//                     />
//                   </div>
//                   <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="category" className="text-right">
//                       Category
//                     </Label>
//                     <Select value={newGoal.category} onValueChange={(value) => handleSelectChange("category", value)}>
//                       <SelectTrigger className="col-span-3">
//                         <SelectValue placeholder="Select a category" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="realEstate">Real Estate</SelectItem>
//                         <SelectItem value="automobile">Automobile</SelectItem>
//                         <SelectItem value="education">Education</SelectItem>
//                         <SelectItem value="general">General</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>
//                   <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="priority" className="text-right">
//                       Priority
//                     </Label>
//                     <Select value={newGoal.priority} onValueChange={(value) => handleSelectChange("priority", value)}>
//                       <SelectTrigger className="col-span-3">
//                         <SelectValue placeholder="Select priority" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="1">High Priority</SelectItem>
//                         <SelectItem value="2">Medium Priority</SelectItem>
//                         <SelectItem value="3">Low Priority</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>
//                   <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="currentSalary" className="text-right">
//                       Current Salary
//                     </Label>
//                     <Input
//                       id="currentSalary"
//                       name="currentSalary"
//                       placeholder="1800000"
//                       type="number"
//                       className="col-span-3"
//                       value={newGoal.currentSalary}
//                       onChange={handleInputChange}
//                     />
//                   </div>
//                   <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="annualIncrementRate" className="text-right">
//                       Annual Increment
//                     </Label>
//                     <Input
//                       id="annualIncrementRate"
//                       name="annualIncrementRate"
//                       placeholder="0.07"
//                       type="number"
//                       step="0.01"
//                       className="col-span-3"
//                       value={newGoal.annualIncrementRate}
//                       onChange={handleInputChange}
//                     />
//                   </div>
//                 </div>
//                 <DialogFooter>
//                   <Button variant="outline" onClick={() => setIsAddGoalOpen(false)}>
//                     Cancel
//                   </Button>
//                   <Button
//                     type="submit"
//                     onClick={handleAddGoal}
//                     disabled={isSubmitting || !newGoal.title || !newGoal.targetAmount || !newGoal.yearsToGoal}
//                   >
//                     {isSubmitting ? (
//                       <>
//                         <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                         Creating...
//                       </>
//                     ) : (
//                       "Create Goal"
//                     )}
//                   </Button>
//                 </DialogFooter>
//               </DialogContent>
//             </Dialog>
//             {/* Modify Goal Dialog */}
//             <Dialog
//               open={isModifyGoalOpen}
//               onOpenChange={(open) => {
//                 setIsModifyGoalOpen(open)
//                 if (!open) setSelectedGoal(null)
//               }}
//             >
//               <DialogContent className="sm:max-w-[425px]">
//                 <DialogHeader>
//                   <DialogTitle>Modify Goal</DialogTitle>
//                   <DialogDescription>Update the details for your financial goal.</DialogDescription>
//                 </DialogHeader>
//                 <div className="grid gap-4 py-4">
//                   <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="title" className="text-right">
//                       Goal Title
//                     </Label>
//                     <div className="col-span-3">
//                       <Input
//                         id="title"
//                         name="title"
//                         placeholder="Dream Home, New Car, etc."
//                         className="w-full"
//                         value={newGoal.title}
//                         onChange={handleInputChange}
//                       />
//                       {newGoal.title && (
//                         <p className="mt-1 text-xs text-muted-foreground break-words">{newGoal.title}</p>
//                       )}
//                     </div>
//                   </div>
//                   <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="targetAmount" className="text-right">
//                       Target Amount
//                     </Label>
//                     <Input
//                       id="targetAmount"
//                       name="targetAmount"
//                       placeholder="500000"
//                       type="number"
//                       className="col-span-3"
//                       value={newGoal.targetAmount}
//                       onChange={handleInputChange}
//                     />
//                   </div>
//                   <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="yearsToGoal" className="text-right">
//                       Years to Goal
//                     </Label>
//                     <Input
//                       id="yearsToGoal"
//                       name="yearsToGoal"
//                       placeholder="5"
//                       type="number"
//                       className="col-span-3"
//                       value={newGoal.yearsToGoal}
//                       onChange={handleInputChange}
//                     />
//                   </div>
//                   <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="category" className="text-right">
//                       Category
//                     </Label>
//                     <Select value={newGoal.category} onValueChange={(value) => handleSelectChange("category", value)}>
//                       <SelectTrigger className="col-span-3">
//                         <SelectValue placeholder="Select a category" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="realEstate">Real Estate</SelectItem>
//                         <SelectItem value="automobile">Automobile</SelectItem>
//                         <SelectItem value="education">Education</SelectItem>
//                         <SelectItem value="general">General</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>
//                   <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="priority" className="text-right">
//                       Priority
//                     </Label>
//                     <Select value={newGoal.priority} onValueChange={(value) => handleSelectChange("priority", value)}>
//                       <SelectTrigger className="col-span-3">
//                         <SelectValue placeholder="Select priority" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="1">High Priority</SelectItem>
//                         <SelectItem value="2">Medium Priority</SelectItem>
//                         <SelectItem value="3">Low Priority</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>
//                   <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="currentSalary" className="text-right">
//                       Current Salary
//                     </Label>
//                     <Input
//                       id="currentSalary"
//                       name="currentSalary"
//                       placeholder="1800000"
//                       type="number"
//                       className="col-span-3"
//                       value={newGoal.currentSalary}
//                       onChange={handleInputChange}
//                     />
//                   </div>
//                   <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="annualIncrementRate" className="text-right">
//                       Annual Increment
//                     </Label>
//                     <Input
//                       id="annualIncrementRate"
//                       name="annualIncrementRate"
//                       placeholder="0.07"
//                       type="number"
//                       step="0.01"
//                       className="col-span-3"
//                       value={newGoal.annualIncrementRate}
//                       onChange={handleInputChange}
//                     />
//                   </div>
//                 </div>
//                 <DialogFooter>
//                   <Button
//                     variant="outline"
//                     onClick={() => {
//                       setIsModifyGoalOpen(false)
//                       setSelectedGoal(null)
//                     }}
//                   >
//                     Cancel
//                   </Button>
//                   <Button
//                     type="submit"
//                     onClick={handleUpdateGoal}
//                     disabled={isSubmitting || !newGoal.title || !newGoal.targetAmount || !newGoal.yearsToGoal}
//                   >
//                     {isSubmitting ? (
//                       <>
//                         <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                         Updating...
//                       </>
//                     ) : (
//                       "Update Goal"
//                     )}
//                   </Button>
//                 </DialogFooter>
//               </DialogContent>
//             </Dialog>

//             <ThemeController />

//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="ghost" className="flex items-center gap-2 h-9 px-2">
//                   <Avatar className="h-7 w-7">
//                     <AvatarImage src="https://github.com/shadcn.png" alt="User Avatar" />
//                     <AvatarFallback>U</AvatarFallback>
//                   </Avatar>
//                   <span className="hidden sm:inline text-sm font-medium">Account</span>
//                   <ChevronDown className="h-4 w-4 text-muted-foreground" />
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent align="end" className="w-56">
//                 <DropdownMenuLabel>My Account</DropdownMenuLabel>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem>
//                   <Settings className="mr-2 h-4 w-4" />
//                   <span>Settings</span>
//                 </DropdownMenuItem>
//                 <DropdownMenuItem>
//                   <TrendingUp className="mr-2 h-4 w-4" />
//                   <span>Financial Overview</span>
//                 </DropdownMenuItem>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem asChild>
//                   <SignOutButton>
//                     <button className="w-full text-left">Sign Out</button>
//                   </SignOutButton>
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </div>
//         </header>

//         {/* Main Content Area with Gradient Background */}
//         <div className="flex flex-col gap-6 p-4 md:p-6 lg:p-8 bg-gradient-to-br from-background via-background/95 to-blue-50/20 dark:to-blue-950/20 min-h-[calc(100vh-4rem)]">
//           {/* Welcome Banner */}
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, ease: "easeOut" }}
//             className="relative overflow-hidden rounded-xl border bg-card shadow-sm"
//           >
//             <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl opacity-70"></div>
//             <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full translate-y-1/2 -translate-x-1/4 blur-3xl opacity-70"></div>

//             <div className="relative p-6 md:p-8">
//               <div className="space-y-2 max-w-2xl">
//                 <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
//                   Welcome to Your Goal Universe
//                 </h1>
//                 <p className="text-muted-foreground">
//                   Track your dreams, financial plans, and aspirations — all in one place. Let's achieve them together!
//                 </p>
//               </div>
//             </div>
//           </motion.div>

//           {/* Search and Filter (Mobile) */}
//           <div className="flex md:hidden gap-2 mb-2">
//             <div className="relative flex-1">
//               <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//               <Input
//                 type="search"
//                 placeholder="Search goals..."
//                 className="w-full pl-8 bg-muted/50 border-input focus-visible:ring-1 focus-visible:ring-primary/50"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//             </div>
//           </div>

//           {/* Goals Dashboard */}
//           <div className="space-y-6">
//             {/* Category Filter Buttons */}
//             <div className="flex flex-wrap gap-2 items-center">
//               <p className="text-sm font-medium text-muted-foreground mr-2 hidden sm:block">Filter by:</p>
//               {categories.map((category) => (
//                 <Button
//                   key={category}
//                   variant={activeCategory === category ? "default" : "outline"}
//                   size="sm"
//                   onClick={() => setActiveCategory(category)}
//                   className={`transition-all duration-150 ${
//                     activeCategory === category ? "shadow-md" : "hover:bg-muted/50"
//                   }`}
//                 >
//                   {formatCategoryName(category)}
//                 </Button>
//               ))}
//             </div>

//             {/* Goals Grid */}
//             <motion.div
//               variants={containerVariants}
//               initial="hidden"
//               animate="visible"
//               className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
//             >
//               {filteredGoals.length > 0 ? (
//                 filteredGoals.map((goal) => (
//                   <motion.div key={goal.id} variants={itemVariants}>
//                     <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-card/90 backdrop-blur-sm border-border/70 hover:border-primary/50 relative group">
//                       <div className="absolute top-3 right-3 z-10">
//                         <DropdownMenu>
//                           <DropdownMenuTrigger asChild>
//                             <Button variant="ghost" size="icon" className="h-8 w-8 opacity-70 group-hover:opacity-100">
//                               <ChevronDown className="h-4 w-4" />
//                             </Button>
//                           </DropdownMenuTrigger>
//                           <DropdownMenuContent align="end">
//                             <DropdownMenuItem
//                               onClick={(e) => {
//                                 e.preventDefault()
//                                 e.stopPropagation()
//                                 handleModifyGoal(goal)
//                               }}
//                             >
//                               <Edit className="h-4 w-4 mr-2" />
//                               <span>Modify Goal</span>
//                             </DropdownMenuItem>
//                             <DropdownMenuSeparator />
//                             <AlertDialog>
//                               <AlertDialogTrigger asChild>
//                                 <DropdownMenuItem
//                                   className="text-destructive focus:text-destructive"
//                                   onSelect={(e) => e.preventDefault()}
//                                 >
//                                   <Trash2 className="h-4 w-4 mr-2" />
//                                   <span>Delete Goal</span>
//                                 </DropdownMenuItem>
//                               </AlertDialogTrigger>
//                               <AlertDialogContent>
//                                 <AlertDialogHeader>
//                                   <AlertDialogTitle>Are you sure?</AlertDialogTitle>
//                                   <AlertDialogDescription>
//                                     This will permanently delete the goal "{goal.title}". This action cannot be undone.
//                                   </AlertDialogDescription>
//                                 </AlertDialogHeader>
//                                 <AlertDialogFooter>
//                                   <AlertDialogCancel>Cancel</AlertDialogCancel>
//                                   <AlertDialogAction
//                                     onClick={() => handleDeleteGoal(goal.id)}
//                                     className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
//                                   >
//                                     Delete
//                                   </AlertDialogAction>
//                                 </AlertDialogFooter>
//                               </AlertDialogContent>
//                             </AlertDialog>
//                           </DropdownMenuContent>
//                         </DropdownMenu>
//                       </div>
//                       <div
//                         className="w-full h-full cursor-pointer"
//                         onClick={(e) => {
//                           e.preventDefault()
//                           e.stopPropagation()
//                           handleModifyGoal(goal)
//                         }}
//                       >
//                         <CardHeader className="pb-3">
//                           <div className="flex items-start mb-2">
//                             <div className="flex-1">
//                               <Badge
//                                 variant="outline"
//                                 className={`font-medium text-xs px-2 py-1 ${
//                                   goal.priority === 1
//                                     ? "border-amber-400 bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-700"
//                                     : "border-border"
//                                 }`}
//                               >
//                                 {formatCategoryName(goal.category)} {goal.priority === 1 ? "• High Priority" : ""}
//                               </Badge>
//                             </div>
//                             <div
//                               className={`p-2 rounded-full ${getCategoryColor(goal.category).replace(
//                                 "bg-",
//                                 "bg-opacity-10 ",
//                               )} ${getCategoryColor(goal.category).replace("bg-", "text-")}`}
//                             >
//                               {getCategoryIcon(goal.category)}
//                             </div>
//                           </div>
//                           <CardTitle className="text-lg leading-tight truncate">{goal.title}</CardTitle>
//                           <CardDescription className="text-xs truncate">
//                             Target: {formatCurrency(goal.targetAmount)} by {new Date().getFullYear() + goal.yearsToGoal}
//                           </CardDescription>
//                         </CardHeader>
//                         <CardContent className="pb-3 flex-grow space-y-3">
//                           <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
//                             <div className="overflow-hidden">
//                               <p className="text-xs text-muted-foreground truncate">Amount Needed:</p>
//                               <p className="font-semibold truncate">{formatCurrency(goal.amountRequired)}</p>
//                             </div>
//                             <div className="overflow-hidden">
//                               <p className="text-xs text-muted-foreground truncate">Future Value:</p>
//                               <p className="font-semibold truncate">{formatCurrency(goal.adjustedTargetAmount)}</p>
//                             </div>
//                             <div className="overflow-hidden">
//                               <p className="text-xs text-muted-foreground truncate">Target Year:</p>
//                               <p className="font-semibold truncate">{new Date().getFullYear() + goal.yearsToGoal}</p>
//                             </div>
//                             <div className="overflow-hidden">
//                               <p className="text-xs text-muted-foreground truncate">Forecasted Salary:</p>
//                               <p className="font-semibold truncate">{formatCurrency(goal.forecastedSalary)}/yr</p>
//                             </div>
//                           </div>
//                           <div>
//                             <div className="flex justify-between text-xs mb-1">
//                               <span className="text-muted-foreground truncate">Achievability:</span>
//                               <span
//                                 className={`font-semibold truncate ${
//                                   goal.isAchievable
//                                     ? "text-green-600 dark:text-green-400"
//                                     : "text-red-600 dark:text-red-400"
//                                 }`}
//                               >
//                                 {goal.isAchievable ? "Likely Achievable" : "Challenging"}
//                               </span>
//                             </div>
//                             <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
//                               <div
//                                 className={`h-full rounded-full ${getCategoryColor(
//                                   goal.category,
//                                 )} transition-all duration-700 ease-out`}
//                                 style={{
//                                   width: goal.isAchievable
//                                     ? `${Math.min(100, (goal.targetAmount / goal.adjustedTargetAmount) * 100 + 20)}%`
//                                     : `${Math.max(10, (goal.currentSalary / goal.targetAmount) * 20)}%`,
//                                 }}
//                               />
//                             </div>
//                           </div>
//                         </CardContent>
//                       </div>
//                     </Card>
//                   </motion.div>
//                 ))
//               ) : (
//                 <div className="col-span-full flex flex-col justify-center items-center p-8 rounded-lg border-2 border-dashed border-border/50 min-h-[200px]">
//                   <PiggyBank className="w-16 h-16 text-muted-foreground/50 mb-4" />
//                   <h3 className="text-lg font-semibold mb-1 text-foreground">No Goals Found</h3>
//                   <p className="text-muted-foreground text-sm mb-4">
//                     Try adjusting your search or filters, or create a new goal!
//                   </p>
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     onClick={() => {
//                       setSearchQuery("")
//                       setActiveCategory("All")
//                     }}
//                   >
//                     Reset Filters
//                   </Button>
//                 </div>
//               )}
//             </motion.div>
//           </div>

//           {/* Goals Summary Component - Made responsive */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
//             className="rounded-xl border bg-card/80 backdrop-blur-sm shadow-sm p-4 md:p-6"
//           >
//             <h2 className="text-xl font-semibold mb-4 text-foreground">Goals Summary</h2>
//             <div className="overflow-x-auto">
//               {/* Responsive wrapper for Goals component */}
//               <div className="min-w-[600px] md:min-w-0">
//                 <Goals />
//               </div>
//             </div>
//           </motion.div>

//           {/* Disclaimer - Made responsive */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
//             className="mt-auto pt-6"
//           >
//             <Card className="bg-background/60 dark:bg-card/50 backdrop-blur-sm border-border/40 shadow-md">
//               <CardHeader className="flex flex-row items-center space-x-3 pb-2">
//                 <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0" />
//                 <CardTitle className="text-md font-semibold text-foreground/90">Important Disclaimer</CardTitle>
//               </CardHeader>
//               <CardContent className="text-xs sm:text-sm text-muted-foreground leading-relaxed overflow-hidden">
//                 <div className="max-w-full overflow-x-auto">
//                   <Disclaimer />
//                 </div>
//               </CardContent>
//             </Card>
//           </motion.div>
//         </div>
//       </SidebarInset>
//     </SidebarProvider>
//   )
// }












































"use client"

import React, { useState, useCallback } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useUser } from "@clerk/nextjs"
import { toast } from "sonner"
import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import Goals from "../Cards/Goals"
import Disclaimer from "../Cards/Disclaimer"
import ThemeController from "../ThemeController/themeController"
import { SignOutButton } from "@clerk/nextjs"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  ChevronDown,
  Search,
  Settings,
  TrendingUp,
  AlertCircle,
  Home,
  Car,
  GraduationCap,
  PiggyBank,
  PlusCircle,
  Loader2,
  Trash2,
  Edit,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 120, damping: 14 },
  },
}

// Format currency in Indian Rupees
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount)
}

const getCategoryColor = (category: string): string => {
  switch (category.toLowerCase()) {
    case "realestate":
      return "bg-purple-500"
    case "automobile":
      return "bg-blue-500"
    case "education":
      return "bg-amber-500"
    case "general":
      return "bg-teal-500"
    default:
      return "bg-emerald-500"
  }
}

const getCategoryIcon = (category: string): React.ReactNode => {
  switch (category.toLowerCase()) {
    case "realestate":
      return <Home className="h-6 w-6" />
    case "automobile":
      return <Car className="h-6 w-6" />
    case "education":
      return <GraduationCap className="h-6 w-6" />
    case "general":
      return <PiggyBank className="h-6 w-6" />
    default:
      return <PiggyBank className="h-6 w-6" />
  }
}

const categories = ["All", "realEstate", "automobile", "education", "general"]

const formatCategoryName = (category: string): string => {
  if (!category) return "Unknown"
  const result = category.replace(/([A-Z])/g, " $1")
  return result.charAt(0).toUpperCase() + result.slice(1)
}

export default function GoalSidebar() {
  const { user } = useUser()
  const queryClient = useQueryClient()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")
  const [isAddGoalOpen, setIsAddGoalOpen] = useState(false)
  const [isModifyGoalOpen, setIsModifyGoalOpen] = useState(false)
  const [selectedGoal, setSelectedGoal] = useState<any>(null)
  const [newGoal, setNewGoal] = useState({
    title: "",
    targetAmount: "",
    yearsToGoal: "",
    category: "general",
    priority: "3",
    currentSalary: "1800000",
    annualIncrementRate: "0.07",
  })

  // Fetch goals query
  const { data: goals = [], isLoading, error } = useQuery({
    queryKey: ['goals', user?.id],
    queryFn: async () => {
      if (!user?.id) return []
      const response = await fetch(`/api/goals/${user.id}`)
      if (!response.ok) {
        throw new Error('Failed to fetch goals')
      }
      const { data } = await response.json()
      return data
    },
    enabled: !!user?.id,
  })

  // Create goal mutation
  const createGoalMutation = useMutation({
    mutationFn: async (goalData: any) => {
      const response = await fetch('/api/goals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(goalData),
      })
      if (!response.ok) {
        throw new Error('Failed to create goal')
      }
      const { data } = await response.json()
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['goals'])
      setIsAddGoalOpen(false)
      toast.success('Goal created successfully')
      setNewGoal({
        title: "",
        targetAmount: "",
        yearsToGoal: "",
        category: "general",
        priority: "3",
        currentSalary: "1800000",
        annualIncrementRate: "0.07",
      })
    },
    onError: () => {
      toast.error('Failed to create goal')
    },
  })

  // Update goal mutation
  const updateGoalMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const response = await fetch('/api/goals', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...data }),
      })
      if (!response.ok) {
        throw new Error('Failed to update goal')
      }
      const { data: responseData } = await response.json()
      return responseData
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['goals'])
      setIsModifyGoalOpen(false)
      setSelectedGoal(null)
      toast.success('Goal updated successfully')
    },
    onError: () => {
      toast.error('Failed to update goal')
    },
  })

  // Delete goal mutation
  const deleteGoalMutation = useMutation({
    mutationFn: async (goalId: string) => {
      const response = await fetch(`/api/goals?id=${goalId}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        throw new Error('Failed to delete goal')
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['goals'])
      toast.success('Goal deleted successfully')
    },
    onError: () => {
      toast.error('Failed to delete goal')
    },
  })

  // Filter goals based on search and active category
  const filteredGoals = goals.filter((goal) => {
    const matchesSearch = goal.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeCategory === "All" || goal.category.toLowerCase() === activeCategory.toLowerCase()
    return matchesSearch && matchesCategory
  })

  // Handle modify goal
  const handleModifyGoal = useCallback((goal: any) => {
    setSelectedGoal(goal)
    setNewGoal({
      title: goal.title,
      targetAmount: goal.targetAmount.toString(),
      yearsToGoal: goal.yearsToGoal.toString(),
      category: goal.category,
      priority: goal.priority.toString(),
      currentSalary: goal.currentSalary.toString(),
      annualIncrementRate: goal.annualIncrementRate.toString(),
    })
    setIsModifyGoalOpen(true)
  }, [])

  // Handle delete goal
  const handleDeleteGoal = useCallback((goalId: string) => {
    deleteGoalMutation.mutate(goalId)
  }, [deleteGoalMutation])

  // Handle add new goal
  const handleAddGoal = useCallback(() => {
    if (!user?.id) return

    const goalData = {
      userId: user.id,
      title: newGoal.title,
      targetAmount: Number(newGoal.targetAmount),
      amountRequired: Number(newGoal.targetAmount),
      yearsToGoal: Number(newGoal.yearsToGoal),
      category: newGoal.category,
      currentSalary: Number(newGoal.currentSalary),
      annualIncrementRate: Number(newGoal.annualIncrementRate),
      priority: Number(newGoal.priority),
    }

    createGoalMutation.mutate(goalData)
  }, [newGoal, user?.id, createGoalMutation])

  // Handle update goal
  const handleUpdateGoal = useCallback(() => {
    if (!selectedGoal?.id) return

    const goalData = {
      title: newGoal.title,
      targetAmount: Number(newGoal.targetAmount),
      amountRequired: Number(newGoal.targetAmount),
      yearsToGoal: Number(newGoal.yearsToGoal),
      category: newGoal.category,
      currentSalary: Number(newGoal.currentSalary),
      annualIncrementRate: Number(newGoal.annualIncrementRate),
      priority: Number(newGoal.priority),
      userId: selectedGoal.userId,
    }

    updateGoalMutation.mutate({ id: selectedGoal.id, data: goalData })
  }, [selectedGoal?.id, selectedGoal?.userId, newGoal, updateGoalMutation])

  // Handle input change for new goal form
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewGoal((prev) => ({ ...prev, [name]: value }))
  }, [])

  // Handle select change for new goal form
  const handleSelectChange = useCallback((name: string, value: string) => {
    setNewGoal((prev) => ({ ...prev, [name]: value }))
  }, [])

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <AlertCircle className="h-12 w-12 text-destructive" />
        <h2 className="text-xl font-semibold">Failed to load goals</h2>
        <p className="text-muted-foreground">Please try again later</p>
      </div>
    )
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* Enhanced Header with Glass Effect */}
        <header className="sticky top-0 flex h-16 shrink-0 items-center justify-between px-4 bg-background/80 backdrop-blur-md border-b z-30">
          <div className="flex items-center gap-3">
            <SidebarTrigger className="text-muted-foreground hover:text-foreground transition-colors" />
            <Separator orientation="vertical" className="h-6" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/user/dashboard" className="text-muted-foreground hover:text-foreground">
                    Dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block text-muted-foreground/50" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-medium">Goals Universe</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative hidden md:flex">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search goals..."
                className="w-[200px] pl-8 rounded-full bg-muted/50 border-none focus-visible:ring-1 focus-visible:ring-primary/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Add Goal Button */}
            <Dialog open={isAddGoalOpen} onOpenChange={setIsAddGoalOpen}>
              <DialogTrigger asChild>
                <Button variant="default" size="sm" className="flex items-center gap-1.5">
                  <PlusCircle className="h-4 w-4" />
                  <span>Add Goal</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Create New Goal</DialogTitle>
                  <DialogDescription>
                    Enter the details for your new financial goal. You can edit more details later.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">
                      Goal Title
                    </Label>
                    <div className="col-span-3">
                      <Input
                        id="title"
                        name="title"
                        placeholder="Dream Home, New Car, etc."
                        className="w-full"
                        value={newGoal.title}
                        onChange={handleInputChange}
                      />
                      {newGoal.title && (
                        <p className="mt-1 text-xs text-muted-foreground break-words">{newGoal.title}</p>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="targetAmount" className="text-right">
                      Target Amount
                    </Label>
                    <Input
                      id="targetAmount"
                      name="targetAmount"
                      placeholder="500000"
                      type="number"
                      className="col-span-3"
                      value={newGoal.targetAmount}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="yearsToGoal" className="text-right">
                      Years to Goal
                    </Label>
                    <Input
                      id="yearsToGoal"
                      name="yearsToGoal"
                      placeholder="5"
                      type="number"
                      className="col-span-3"
                      value={newGoal.yearsToGoal}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="category" className="text-right">
                      Category
                    </Label>
                    <Select value={newGoal.category} onValueChange={(value) => handleSelectChange("category", value)}>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="realEstate">Real Estate</SelectItem>
                        <SelectItem value="automobile">Automobile</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="general">General</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="priority" className="text-right">
                      Priority
                    </Label>
                    <Select value={newGoal.priority} onValueChange={(value) => handleSelectChange("priority", value)}>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">High Priority</SelectItem>
                        <SelectItem value="2">Medium Priority</SelectItem>
                        <SelectItem value="3">Low Priority</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="currentSalary" className="text-right">
                      Current Salary
                    </Label>
                    <Input
                      id="currentSalary"
                      name="currentSalary"
                      placeholder="1800000"
                      type="number"
                      className="col-span-3"
                      value={newGoal.currentSalary}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="annualIncrementRate" className="text-right">
                      Annual Increment
                    </Label>
                    <Input
                      id="annualIncrementRate"
                      name="annualIncrementRate"
                      placeholder="0.07"
                      type="number"
                      step="0.01"
                      className="col-span-3"
                      value={newGoal.annualIncrementRate}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddGoalOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    onClick={handleAddGoal}
                    disabled={createGoalMutation.isLoading || !newGoal.title || !newGoal.targetAmount || !newGoal.yearsToGoal}
                  >
                    {createGoalMutation.isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      "Create Goal"
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <ThemeController />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 h-9 px-2">
                  <Avatar className="h-7 w-7">
                    <AvatarImage src="https://github.com/shadcn.png" alt="User Avatar" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:inline text-sm font-medium">Account</span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <TrendingUp className="mr-2 h-4 w-4" />
                  <span>Financial Overview</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <SignOutButton>
                    <button className="w-full text-left">Sign Out</button>
                  </SignOutButton>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Main Content Area with Gradient Background */}
        <div className="flex flex-col gap-6 p-4 md:p-6 lg:p-8 bg-gradient-to-br from-background via-background/95 to-blue-50/20 dark:to-blue-950/20 min-h-[calc(100vh-4rem)]">
          {/* Welcome Banner */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative overflow-hidden rounded-xl border bg-card shadow-sm"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl opacity-70"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full translate-y-1/2 -translate-x-1/4 blur-3xl opacity-70"></div>

            <div className="relative p-6 md:p-8">
              <div className="space-y-2 max-w-2xl">
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                  Welcome to Your Goal Universe
                </h1>
                <p className="text-muted-foreground">
                  Track your dreams, financial plans, and aspirations — all in one place. Let's achieve them together!
                </p>
              </div>
            </div>
          </motion.div>

          {/* Search and Filter (Mobile) */}
          <div className="flex md:hidden gap-2 mb-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search goals..."
                className="w-full pl-8 bg-muted/50 border-input focus-visible:ring-1 focus-visible:ring-primary/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Goals Dashboard */}
          <div className="space-y-6">
            {/* Category Filter Buttons */}
            <div className="flex flex-wrap gap-2 items-center">
              <p className="text-sm font-medium text-muted-foreground mr-2 hidden sm:block">Filter by:</p>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCategory(category)}
                  className={`transition-all duration-150 ${
                    activeCategory === category ? "shadow-md" : "hover:bg-muted/50"
                  }`}
                >
                  {formatCategoryName(category)}
                </Button>
              ))}
            </div>

            {/* Goals Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {filteredGoals.length > 0 ? (
                filteredGoals.map((goal) => (
                  <motion.div key={goal.id} variants={itemVariants}>
                    <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-card/90 backdrop-blur-sm border-border/70 hover:border-primary/50 relative group">
                      <div className="absolute top-3 right-3 z-10">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 opacity-70 group-hover:opacity-100">
                              <ChevronDown className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                handleModifyGoal(goal)
                              }}
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              <span>Modify Goal</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <DropdownMenuItem
                                  className="text-destructive focus:text-destructive"
                                  onSelect={(e) => e.preventDefault()}
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  <span>Delete Goal</span>
                                </DropdownMenuItem>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This will permanently delete the goal "{goal.title}". This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDeleteGoal(goal.id)}
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <div
                        className="w-full h-full cursor-pointer"
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          handleModifyGoal(goal)
                        }}
                      >
                        <CardHeader className="pb-3">
                          <div className="flex items-start mb-2">
                            <div className="flex-1">
                              <Badge
                                variant="outline"
                                className={`font-medium text-xs px-2 py-1 ${
                                  goal.priority === 1
                                    ? "border-amber-400 bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-700"
                                    : "border-border"
                                }`}
                              >
                                {formatCategoryName(goal.category)} {goal.priority === 1 ? "• High Priority" : ""}
                              </Badge>
                            </div>
                            <div
                              className={`p-2 rounded-full ${getCategoryColor(goal.category).replace(
                                "bg-",
                                "bg-opacity-10 ",
                              )} ${getCategoryColor(goal.category).replace("bg-", "text-")}`}
                            >
                              {getCategoryIcon(goal.category)}
                            </div>
                          </div>
                          <CardTitle className="text-lg leading-tight truncate">{goal.title}</CardTitle>
                          <CardDescription className="text-xs truncate">
                            Target: {formatCurrency(goal.targetAmount)} by {new Date().getFullYear() + goal.yearsToGoal}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="pb-3 flex-grow space-y-3">
                          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                            <div className="overflow-hidden">
                              <p className="text-xs text-muted-foreground truncate">Amount Needed:</p>
                              <p className="font-semibold truncate">{formatCurrency(goal.amountRequired)}</p>
                            </div>
                            <div className="overflow-hidden">
                              <p className="text-xs text-muted-foreground truncate">Future Value:</p>
                              <p className="font-semibold truncate">{formatCurrency(goal.adjustedTargetAmount)}</p>
                            </div>
                            <div className="overflow-hidden">
                              <p className="text-xs text-muted-foreground truncate">Target Year:</p>
                            <p className="font-semibold truncate">{new Date().getFullYear() + goal.yearsToGoal}</p>
                            </div>
                            <div className="overflow-hidden">
                              <p className="text-xs text-muted-foreground truncate">Forecasted Salary:</p>
                              <p className="font-semibold truncate">{formatCurrency(goal.forecastedSalary)}/yr</p>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-muted-foreground truncate">Achievability:</span>
                              <span
                                className={`font-semibold truncate ${
                                  goal.isAchievable
                                    ? "text-green-600 dark:text-green-400"
                                    : "text-red-600 dark:text-red-400"
                                }`}
                              >
                                {goal.isAchievable ? "Likely Achievable" : "Challenging"}
                              </span>
                            </div>
                            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${getCategoryColor(
                                  goal.category,
                                )} transition-all duration-700 ease-out`}
                                style={{
                                  width: goal.isAchievable
                                    ? `${Math.min(100, (goal.targetAmount / goal.adjustedTargetAmount) * 100 + 20)}%`
                                    : `${Math.max(10, (goal.currentSalary / goal.targetAmount) * 20)}%`,
                                }}
                              />
                            </div>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full flex flex-col justify-center items-center p-8 rounded-lg border-2 border-dashed border-border/50 min-h-[200px]">
                  <PiggyBank className="w-16 h-16 text-muted-foreground/50 mb-4" />
                  <h3 className="text-lg font-semibold mb-1 text-foreground">No Goals Found</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Try adjusting your search or filters, or create a new goal!
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSearchQuery("")
                      setActiveCategory("All")
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              )}
            </motion.div>
          </div>

          {/* Goals Summary Component */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
            className="rounded-xl border bg-card/80 backdrop-blur-sm shadow-sm p-4 md:p-6"
          >
            <h2 className="text-xl font-semibold mb-4 text-foreground">Goals Summary</h2>
            <div className="overflow-x-auto">
              <div className="min-w-[600px] md:min-w-0">
                <Goals />
              </div>
            </div>
          </motion.div>

          {/* Disclaimer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
            className="mt-auto pt-6"
          >
            <Card className="bg-background/60 dark:bg-card/50 backdrop-blur-sm border-border/40 shadow-md">
              <CardHeader className="flex flex-row items-center space-x-3 pb-2">
                <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0" />
                <CardTitle className="text-md font-semibold text-foreground/90">Important Disclaimer</CardTitle>
              </CardHeader>
              <CardContent className="text-xs sm:text-sm text-muted-foreground leading-relaxed overflow-hidden">
                <div className="max-w-full overflow-x-auto">
                  <Disclaimer />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
