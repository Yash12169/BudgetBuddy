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

// Define goal type
interface Goal {
  id: string
  title: string
  category: string
  priority: number
  targetAmount: number
  yearsToGoal: number
  amountRequired: number
  adjustedTargetAmount: number
  forecastedSalary: number
  currentSalary: number
  isAchievable: boolean
}

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
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")

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
      //@ts-expect-error - TODO: fix this
      queryClient.invalidateQueries(['goals'])
      toast.success('Goal deleted successfully')
    },
    onError: () => {
      toast.error('Failed to delete goal')
    },
  })

  const filteredGoals = goals.filter((goal: Goal) => {
    const matchesSearch = goal.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeCategory === "All" || goal.category.toLowerCase() === activeCategory.toLowerCase()
    return matchesSearch && matchesCategory
  })

  // Handle modify goal
  const handleModifyGoal = useCallback((goal: Goal) => {
    // Navigate to edit page with goal data
    router.push(`/user/goals/goal-edit?id=${goal.id}`)
  }, [router])

  // Handle delete goal
  const handleDeleteGoal = useCallback((goalId: string) => {
    deleteGoalMutation.mutate(goalId)
  }, [deleteGoalMutation])

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
            <Button variant="default" size="sm" className="flex items-center gap-1.5" onClick={() => router.push("/user/goal/add-goal")}>
              <PlusCircle className="h-4 w-4" />
              <span>Add Goal</span>
            </Button>

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
                  Track your dreams, financial plans, and aspirations — all in one place. Let&apos;s achieve them together!
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
                filteredGoals.map((goal: Goal) => (
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
                                    This will permanently delete the goal &quot;{goal.title}&quot;. This action cannot be undone.
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

          {/* Goals Summary Component
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
          </motion.div> */}   
            <Disclaimer />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
