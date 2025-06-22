"use client"

import React, { useState, useCallback } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useUser, SignOutButton } from "@clerk/nextjs"
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
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  ChevronDown,
  AlertCircle,
  Home,
  Car,
  GraduationCap,
  PiggyBank,
  PlusCircle,
  Loader2,
  Trash2,
  Edit,
  Target,
  TrendingUp,
  Calendar,
  LogOut,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
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

interface Goal {
  id: string;
  userId: string;
  title: string;
  targetAmount: number;
  yearsToGoal: number;
  category: string;
  isAchievable: boolean;
  priority: number;
  createdAt: string;
  updatedAt: string;
}

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
}

const itemVariants = {
  hidden: { y: 30, opacity: 0, scale: 0.95 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
    },
  },
}

const statsVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
}


const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount)
}


const formatShortNumber = (amount: number) => {
  if (amount >= 10000000) {
    return (amount / 10000000).toFixed(amount % 10000000 === 0 ? 0 : 1) + 'Cr';
  } else if (amount >= 100000) {
    return (amount / 100000).toFixed(amount % 100000 === 0 ? 0 : 1) + 'L';
  } else if (amount >= 1000) {
    return (amount / 1000).toFixed(amount % 1000 === 0 ? 0 : 1) + 'k';
  } else {
    return amount.toString();
  }
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
      return <Home className="h-5 w-5" />
    case "automobile":
      return <Car className="h-5 w-5" />
    case "education":
      return <GraduationCap className="h-5 w-5" />
    case "general":
      return <PiggyBank className="h-5 w-5" />
    default:
      return <Target className="h-5 w-5" />
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
    const matchesCategory = activeCategory === "All" || goal.category.toLowerCase() === activeCategory.toLowerCase()
    return matchesCategory
  })

 
  const totalGoals = goals.length
  const achievableGoals = goals.filter((goal: Goal) => goal.isAchievable).length
  //const totalTargetAmount = goals.reduce((sum: number, goal: Goal) => sum + goal.targetAmount, 0)
  const highPriorityGoals = goals.filter((goal: Goal) => goal.priority === 1).length

 
  const handleModifyGoal = useCallback((goal: Goal) => {
    router.push(`/user/goals/goal-edit?id=${goal.id}`)
  }, [router])

  const handleDeleteGoal = useCallback((goalId: string) => {
    deleteGoalMutation.mutate(goalId)
  }, [deleteGoalMutation])

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground">Loading your goals...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4 bg-gradient-to-br from-background via-background/95 to-destructive/5">
        <AlertCircle className="h-16 w-16 text-destructive" />
        <h2 className="text-2xl font-semibold">Failed to load goals</h2>
        <p className="text-muted-foreground">Please refresh the page or try again later</p>
        <Button onClick={() => window.location.reload()} variant="outline">
          Retry
        </Button>
      </div>
    )
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
       
        <header className="sticky top-0 flex h-16 shrink-0 items-center justify-between px-4 md:px-6 bg-background/90 backdrop-blur-xl border-b border-border/50 z-30">
          <div className="flex items-center gap-3">
            <SidebarTrigger className="text-muted-foreground hover:text-foreground transition-colors" />
            <Separator orientation="vertical" className="h-6" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/user/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
                    Dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block text-muted-foreground/50" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-semibold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                    Goals Universe
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="flex items-center gap-3">
            <Button 
              variant="default" 
              size="sm" 
              className="flex items-center gap-2 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 shadow-lg hover:shadow-xl transition-all duration-200" 
              onClick={() => router.push("/user/goal/add-goal")}
            >
              <PlusCircle className="h-4 w-4" />
              <span className="hidden sm:inline">Add Goal</span>
            </Button>

            <ThemeController />
            <SignOutButton>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </Button>
            </SignOutButton>
          </div>
        </header>

        
        <div className="flex flex-col gap-8 p-4 md:p-6 lg:p-8 bg-gradient-to-br from-background via-background/95 to-primary/5 dark:to-primary/10 min-h-[calc(100vh-4rem)]">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.42, 0, 0.58, 1] }}
            className="relative overflow-hidden rounded-2xl border bg-card/50 backdrop-blur-sm shadow-xl"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-primary/10 to-transparent rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full translate-y-1/2 -translate-x-1/4 blur-3xl"></div>

            <div className="relative p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-3 max-w-2xl">
                  <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                    Your Goal Universe
                  </h1>
                  <p className="text-muted-foreground text-lg">
                    Transform dreams into achievable milestones. Track your progress and build your future, one goal at a time.
                  </p>
                </div>
                
                {/* Stats Cards */}
                <motion.div 
                  variants={statsVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-4 min-w-fit"
                >
                  <div className="text-center p-4 rounded-xl bg-background/60 backdrop-blur-sm border border-border/50">
                    <Target className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <p className="text-2xl font-bold text-foreground">{totalGoals}</p>
                    <p className="text-xs text-muted-foreground">Total Goals</p>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-background/60 backdrop-blur-sm border border-border/50">
                    <TrendingUp className="h-6 w-6 mx-auto mb-2 text-green-500" />
                    <p className="text-2xl font-bold text-foreground">{achievableGoals}</p>
                    <p className="text-xs text-muted-foreground">Achievable</p>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-background/60 backdrop-blur-sm border border-border/50 col-span-2 md:col-span-1">
                    <Calendar className="h-6 w-6 mx-auto mb-2 text-amber-500" />
                    <p className="text-2xl font-bold text-foreground">{highPriorityGoals}</p>
                    <p className="text-xs text-muted-foreground">High Priority</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

         
          <div className="space-y-6 mb-16 md:mb-6">
            <div className="flex flex-wrap gap-3 items-center p-4 rounded-xl bg-card/30 backdrop-blur-sm border border-border/50">
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                <p className="font-semibold text-foreground">Filter Goals:</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={activeCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveCategory(category)}
                    className={`transition-all duration-200 ${
                      activeCategory === category 
                        ? "bg-gradient-to-r from-primary to-blue-600 shadow-lg scale-105" 
                        : "hover:bg-muted/70 hover:scale-105"
                    }`}
                  >
                    {formatCategoryName(category)}
                  </Button>
                ))}
              </div>
            </div>

           
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {filteredGoals.length > 0 ? (
                filteredGoals.map((goal: Goal) => (
                  <motion.div key={goal.id} variants={itemVariants}>
                    <Card className="h-full flex flex-col overflow-hidden hover:shadow-2xl transition-all duration-300 bg-card/70 backdrop-blur-sm border-border/50 hover:border-primary/50 hover:scale-102 relative group">
                     
                      {goal.priority === 1 && (
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-orange-500"></div>
                      )}
                      
                      <div className="absolute top-4 right-4 z-10">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 hover:bg-background">
                              <ChevronDown className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-background/95 backdrop-blur-sm">
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
                              <AlertDialogContent className="bg-background/95 backdrop-blur-sm">
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
                        <CardHeader className="pb-4">
                          <div className="flex items-start justify-between mb-3">
                            <Badge
                              variant="outline"
                              className={`font-medium text-xs px-3 py-1 ${
                                goal.priority === 1
                                  ? "border-amber-400 bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-700"
                                  : "border-border bg-muted/50"
                              }`}
                            >
                              {formatCategoryName(goal.category)}
                            </Badge>
                            <div
                              className={`p-2.5 rounded-full ${getCategoryColor(goal.category).replace(
                                "bg-",
                                "bg-opacity-20 ",
                              )} ${getCategoryColor(goal.category).replace("bg-", "text-")}`}
                            >
                              {getCategoryIcon(goal.category)}
                            </div>
                          </div>
                          <CardTitle className="text-lg leading-tight line-clamp-2 mb-2">{goal.title}</CardTitle>
                          <CardDescription className="text-sm">
                            Target: <span className="font-semibold">{formatCurrency(goal.targetAmount)}</span> by {new Date().getFullYear() + goal.yearsToGoal}
                          </CardDescription>
                        </CardHeader>
                        
                        <CardContent className="pb-4 flex-grow space-y-4">
                          <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                            <div className="space-y-1">
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">Monthly Required</span>
                                <p className="font-semibold text-foreground">{formatCurrency(goal.targetAmount / (goal.yearsToGoal * 12))}</p>
                              </div>
                            </div>
                            <div className="space-y-1">
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">Target Amount</span>
                                <p className="font-semibold text-foreground">{formatCurrency(goal.targetAmount)}</p>
                              </div>
                            </div>
                            <div className="space-y-1">
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">Years to Goal</span>
                                <p className="font-semibold text-foreground">{goal.yearsToGoal} years</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-muted-foreground">Achievability:</span>
                              <Badge
                                variant={goal.isAchievable ? "default" : "destructive"}
                                className="text-xs px-2 py-0.5"
                              >
                                {goal.isAchievable ? "Likely Achievable" : "Challenging"}
                              </Badge>
                            </div>
                            <div className="h-2.5 w-full bg-muted rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${getCategoryColor(
                                  goal.category,
                                )} transition-all duration-1000 ease-out shadow-sm`}
                                style={{
                                  width: `${Math.min(100, Math.max(20, (goal.targetAmount / goal.targetAmount) * 100 + 30))}%`
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
                <div className="col-span-full flex flex-col justify-center items-center p-12 rounded-2xl border-2 border-dashed border-border/50 bg-card/30 backdrop-blur-sm min-h-[300px]">
                  <PiggyBank className="w-20 h-20 text-muted-foreground/50 mb-6" />
                  <h3 className="text-xl font-semibold mb-2 text-foreground">No Goals Found</h3>
                  <p className="text-muted-foreground text-center mb-6 max-w-md">
                    {activeCategory !== "All" 
                      ? `No goals found in the ${formatCategoryName(activeCategory)} category. Try a different category or create your first ${formatCategoryName(activeCategory).toLowerCase()} goal!`
                      : "Start your journey by creating your first goal. Every great achievement begins with a single step!"
                    }
                  </p>
                  <div className="flex gap-3">
                    {activeCategory !== "All" && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setActiveCategory("All")}
                        className="hover:bg-muted/70"
                      >
                        View All Goals
                      </Button>
                    )}
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => router.push("/user/goal/add-goal")}
                      className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90"
                    >
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Create Goal
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          <Disclaimer />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}