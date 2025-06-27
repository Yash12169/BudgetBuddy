"use client"

import React, { useState, useCallback, useEffect } from "react"
import { useUser, SignOutButton } from "@clerk/nextjs"
import { toast } from "sonner"
import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import Disclaimer from "../Cards/Disclaimer"
import { Button } from "@/components/ui/button"
import {
  Home,
  Car,
  GraduationCap,
  PiggyBank,
  PlusCircle,
  Loader2,
  Target,
  TrendingUp,
  Calendar,
  LogOut,
  User,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { useAtom } from "jotai"
import { goalAtom, persistentThemeAtom } from "@/atoms/atoms"
import axios from "axios"
import { montserrat, poppins } from "@/fonts/fonts"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

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

interface theme {
  id: string | number;
  theme: string;
  primary: string;
  secondary: string;
  accent: string;
  neutral: string;
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

function formatIndianNumber(num: number): string {
  if (num >= 10000000) {
    return (num / 10000000).toFixed(2).replace(/\.00$/, '') + 'Cr';
  } else if (num >= 100000) {
    return (num / 100000).toFixed(2).replace(/\.00$/, '') + 'L';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(2).replace(/\.00$/, '') + 'K';
  } else {
    return num.toLocaleString('en-IN');
  }
}

function GoalCardSkeleton() {
  return (
    <div className="h-full flex flex-col overflow-hidden shadow-lg rounded-2xl border border-neutral-content/20 bg-neutral p-6">
      <div className="pb-4 flex flex-row items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-neutral-content/20 text-2xl">
            <div className="skeleton w-5 h-5 rounded"></div>
          </div>
          <div className="flex flex-col">
            <div className="skeleton h-5 w-24 mb-1"></div>
            <div className="skeleton h-3 w-16"></div>
          </div>
        </div>
        <div className="ml-auto">
          <div className="skeleton h-6 w-20 rounded-full"></div>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col gap-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="skeleton h-4 w-20"></div>
            <div className="skeleton h-4 w-16"></div>
          </div>
          <div className="border-t border-neutral-content/10 my-1" />
          <div className="flex justify-between items-center">
            <div className="skeleton h-4 w-24"></div>
            <div className="skeleton h-4 w-20"></div>
          </div>
          <div className="border-t border-neutral-content/10 my-1" />
          <div className="flex justify-between items-center">
            <div className="skeleton h-4 w-20"></div>
            <div className="skeleton h-4 w-8"></div>
          </div>
        </div>
        
        <div className="flex items-center gap-2 mt-2">
          <div className="skeleton h-3 w-20"></div>
          <div className="skeleton h-5 w-24 rounded-full"></div>
        </div>
        
        <div className="border-t border-neutral-content/20 mt-4"></div>
      </div>
      
      <div className="flex justify-between items-center gap-2 mt-4">
        <div className="skeleton h-8 w-16 rounded-lg"></div>
        <div className="skeleton h-8 w-16 rounded-lg"></div>
      </div>
    </div>
  );
}

export default function GoalSidebar() {
  const { user } = useUser()
  const router = useRouter()
  const [activeCategory, setActiveCategory] = useState("All")
  const [goals, setGoals] = useAtom(goalAtom)
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [isAddGoalLoading, setIsAddGoalLoading] = useState(false);
  const [deletingGoalId, setDeletingGoalId] = useState<string | null>(null);
  const [modifyingGoalId, setModifyingGoalId] = useState<string | null>(null);
  const [, setTheme] = useAtom(persistentThemeAtom);
  
  const themes: theme[] = [
    {
      id: 0,
      theme: 'dark', 
      primary: "#200282",     
      secondary: "#5c6bc0",   
      accent: "#00bcd4",      
      neutral: "#0d1117",     
    },
    {
      id: 1,
      theme: 'night', 
      primary: "#000",     
      secondary: "#94a3b8",   
      accent: "#22d3ee",      
      neutral: "#1e1e2f",     
    },
    {
      id: 2,
      theme: 'corporate', 
      primary: "#4169e1",     
      secondary: "#7b9fff",   
      accent: "#00c49a",      
      neutral: "#f4f4f5",     
    },
  ];

  // Fetch goals when component mounts or user changes
  useEffect(() => {
    const fetchGoals = async () => {
      if (user?.id) {
        try {
          const response = await axios.get(`/api/goals/${user.id}`)
          setGoals(response.data)
        } catch (error) {
          console.error('Failed to fetch goals:', error)
        }
      }
    }

    fetchGoals()
  }, [user?.id, setGoals])

  // Refresh goals data
  const refreshGoals = useCallback(async () => {
    if (user?.id) {
      try {
        const response = await axios.get(`/api/goals/${user.id}`)
        setGoals(response.data)
      } catch {
        console.error('Failed to refresh goals')
      }
    }
  }, [user?.id, setGoals])

  // Listen for route changes to refresh goals when returning from add-goal
  useEffect(() => {
    const handleRouteChange = () => {
      // Refresh goals when the component becomes visible again
      refreshGoals()
    }

    // Refresh goals when component mounts (after navigation)
    handleRouteChange()

    // Optional: Listen for focus events to refresh when user returns to tab
    const handleFocus = () => {
      refreshGoals()
    }

    window.addEventListener('focus', handleFocus)
    
    return () => {
      window.removeEventListener('focus', handleFocus)
    }
  }, [refreshGoals])

  const handleProfileClick = async () => {
    setIsProfileLoading(true);
    try {
      await router.push("/user/profile");
    } finally {
      setIsProfileLoading(false);
    }
  };

  const handleThemeChange = (theme: string) => {
    setTheme(theme);
  };

  const handleAddGoalClick = async () => {
    setIsAddGoalLoading(true);
    try {
      await router.push("/user/goal/add-goal");
    } finally {
      setIsAddGoalLoading(false);
    }
  };

  const goalsList = Array.isArray(goals) ? goals : (goals?.data || [])

  const deleteGoalMutation = useCallback(async (goalId: string) => {
    setDeletingGoalId(goalId);
    try {
      await axios.delete(`/api/goals?id=${goalId}`)
      await refreshGoals() // Use the refresh function instead of direct fetch
      toast.success('Goal deleted successfully')
    } catch {
      toast.error('Failed to delete goal')
    } finally {
      setDeletingGoalId(null);
    }
  }, [refreshGoals])

  const filteredGoals = goalsList.filter((goal: Goal) => {
    const matchesCategory = activeCategory === "All" || goal.category.toLowerCase() === activeCategory.toLowerCase()
    return matchesCategory
  })

  const totalGoals = goalsList.length
  const achievableGoals = goalsList.filter((goal: Goal) => goal.isAchievable).length
  const highPriorityGoals = goalsList.filter((goal: Goal) => goal.priority === 1).length

  const handleModifyGoal = useCallback(async (goal: Goal) => {
    setModifyingGoalId(goal.id);
    console.log('Modify goal clicked:', goal.id);
    try {
      await router.push(`/user/goals/goal-edit?id=${goal.id}`)
    } catch (error) {
      console.error('Navigation failed:', error);
    } finally {
      setModifyingGoalId(null);
    }
  }, [router])

  const handleDeleteGoal = useCallback((goalId: string) => {
    deleteGoalMutation(goalId)
  }, [deleteGoalMutation])

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
       
        <header className="z-30 sticky top-0 flex h-16 shrink-0 items-center justify-between px-4 md:px-6 bg-base-200">
          <div className="flex items-center gap-3">
            <SidebarTrigger className="text-muted-foreground hover:text-foreground transition-colors" />
            <Separator orientation="vertical" className="h-6" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/user/goals" className="text-base-content hover:text-neutral-content/50">
                    Goals
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-8 w-8 cursor-pointer hover:opacity-80 transition-opacity ring-2 ring-transparent hover:ring-primary/20">
                  <AvatarImage src={user?.imageUrl} alt={user?.fullName || "User"} />
                  <AvatarFallback className="bg-gradient-to-br from-primary/10 to-primary/20 text-primary font-medium">
                    {user?.firstName?.charAt(0) || user?.emailAddresses[0]?.emailAddress?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 p-2 shadow-lg">
                <DropdownMenuItem 
                  onClick={handleProfileClick}
                  disabled={isProfileLoading}
                  className={`cursor-pointer rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground disabled:opacity-50 disabled:cursor-not-allowed ${poppins}`}
                >
                  {isProfileLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <User className="mr-2 h-4 w-4" />
                  )}
                  {isProfileLoading ? "Loading..." : "My Profile"}
                </DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className={`cursor-pointer rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${poppins}`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      className="mr-2"
                      fill="currentColor"
                    >
                      <path d="M9.38 21.646A9.985 9.985 0 0 0 12 22l.141-.001a2.998 2.998 0 0 0 2.515-1.425c.542-.876.6-1.953.153-2.88l-.198-.415c-.453-.942-.097-1.796.388-2.281.485-.485 1.341-.841 2.28-.388h.001l.413.199a2.99 2.99 0 0 0 2.881-.153A2.997 2.997 0 0 0 22 12.141a9.926 9.926 0 0 0-.353-2.76c-1.038-3.827-4.353-6.754-8.246-7.285-3.149-.427-6.241.602-8.471 2.833S1.666 10.247 2.096 13.4c.53 3.894 3.458 7.208 7.284 8.246zM15.5 6a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-5-1a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zM9 15.506a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm-2.5-6.5a1.5 1.5 0 1 1-.001 3.001A1.5 1.5 0 0 1 6.5 9.006z"></path>
                    </svg>
                    Change Theme
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent className="w-48 max-h-64 overflow-y-auto">
                    {themes.map((theme) => (
                      <DropdownMenuItem
                        key={theme.id}
                        onClick={() => handleThemeChange(theme.theme)}
                        className={`cursor-pointer flex justify-between items-center px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${poppins}`}
                      >
                        <span className="capitalize">{theme.theme}</span>
                        <div className="flex gap-1">
                          <div style={{backgroundColor: theme.primary}} className="w-2 h-4 rounded-full"></div>
                          <div style={{backgroundColor: theme.secondary}} className="w-2 h-4 rounded-full"></div>
                          <div style={{backgroundColor: theme.accent}} className="w-2 h-4 rounded-full"></div>
                          <div style={{backgroundColor: theme.neutral}} className="w-2 h-4 rounded-full"></div>
                        </div>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuSeparator className="my-2" />
                <DropdownMenuItem 
                  asChild
                  className={`cursor-pointer rounded-md px-3 py-2 text-sm transition-colors hover:bg-destructive/10 hover:text-destructive focus:bg-destructive/10 focus:text-destructive ${poppins}`}
                >
                  <SignOutButton>
                    <div className="flex items-center w-full">
                      <LogOut className="mr-2 h-4 w-4" />
                      Log Out
                    </div>
                  </SignOutButton>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        
        <div className="flex flex-col gap-8 p-4 md:p-6 lg:p-8  bg-base-200">
          <div className="flex flex-col justify-between gap-8">
            <div
              className="relative overflow-hidden rounded-2xl border bg-neutral"
            >
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full translate-y-1/2 -translate-x-1/4 blur-3xl"></div>

              <div className="relative p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-3 max-w-2xl">
                    <h1 className={`${montserrat} text-3xl md:text-4xl font-semibold tracking-tight text-neutral-content`}>
                      Your Goal Universe
                    </h1>
                    <p className={`text-neutral-content/50 ${poppins}`}>
                      Transform dreams into achievable milestones. Track your progress and build your future, one goal at a time.
                    </p>
                  </div>
                  
                  
                  <div
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4 min-w-fit"
                  >
                    <div className="text-center p-4 rounded-xl bg-background/60 backdrop-blur-sm border border-border/50">
                      <Target className="h-6 w-6 mx-auto mb-2 text-primary" />
                      <p className={`text-2xl font-bold text-foreground ${montserrat}`}>{totalGoals}</p>
                      <p className={`text-xs text-muted-foreground ${poppins}`}>Total Goals</p>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-background/60 backdrop-blur-sm border border-border/50">
                      <TrendingUp className="h-6 w-6 mx-auto mb-2 text-green-500" />
                      <p className={`text-2xl font-bold text-foreground ${montserrat}`}>{achievableGoals}</p>
                      <p className={`text-xs text-muted-foreground ${poppins}`}>Achievable</p>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-background/60 backdrop-blur-sm border border-border/50 col-span-2 md:col-span-1">
                      <Calendar className="h-6 w-6 mx-auto mb-2 text-amber-500" />
                      <p className={`text-2xl font-bold text-foreground ${montserrat}`}>{highPriorityGoals}</p>
                      <p className={`text-xs text-muted-foreground ${poppins}`}>High Priority</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

           
            <div className="gap-8 flex flex-col">
              <div className="flex flex-wrap gap-3 items-center p-4 rounded-xl bg-neutral backdrop-blur-sm border border-border/50">
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-neutral-content" />
                  <p className={`font-semibold text-neutral-content ${montserrat}`}>Filter Goals:</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant="outline"
                      size="sm"
                      onClick={() => setActiveCategory(category)}
                      className={`rounded-lg border-neutral-content/20 bg-neutral-content/10 text-neutral-content hover:bg-neutral-content transition-all duration-200 ${poppins} ${
                        activeCategory === category 
                          ? "bg-neutral-content text-neutral shadow-lg scale-105" 
                          : "hover:scale-105"
                      }`}
                    >
                      {formatCategoryName(category)}
                    </Button>
                  ))}
                </div>
                <div className="ml-auto">
                  <Button 
                    variant="outline"
                    size="sm" 
                    className={`flex items-center gap-2 rounded-lg border-neutral-content/20 bg-neutral-content/10 text-neutral-content hover:bg-neutral-content transition-all duration-200 ${poppins}`}
                    onClick={handleAddGoalClick}
                    disabled={isAddGoalLoading}
                  >
                    {isAddGoalLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <PlusCircle className="h-4 w-4" />
                    )}
                    <span className="hidden sm:inline">
                      {isAddGoalLoading ? "Adding..." : "Add Goal"}
                    </span>
                  </Button>
                </div>
              </div>

             
              <div
                className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3"
              >
                {!goals ? (
                  Array.from({ length: 3 }).map((_, i) => <GoalCardSkeleton key={i} />)
                ) : filteredGoals.length > 0 ? (
                  filteredGoals.map((goal: Goal) => (
                    <div key={goal.id}>
                      <Card className="h-full flex flex-col overflow-hidden shadow-lg rounded-2xl border border-neutral-content/20 bg-neutral text-neutral-content transition-all duration-300 group">
                        {false && goal.priority === 1 && (
                          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-t-2xl"></div>
                        )}
                        <CardHeader className="pb-4 flex flex-row items-center gap-3">
                          <div className="flex items-center gap-2">
                            <div className={`p-2 rounded-lg ${getCategoryColor(goal.category)} bg-opacity-20 text-2xl`}>{getCategoryIcon(goal.category)}</div>
                            <div className="flex flex-col">
                              <h2 className={`text-lg font-semibold ${montserrat} text-neutral-content mb-1`}>{goal.title}</h2>
                              <span className={`text-xs ${poppins} text-neutral-content/70`}>{formatCategoryName(goal.category)}</span>
                            </div>
                          </div>
                          <Badge
                            variant="outline"
                            className={`ml-auto font-medium text-xs px-3 py-1 ${poppins} ${
                              goal.priority === 1
                                ? "border-red-700 bg-red-300 text-red-700"
                                : goal.priority === 2
                                ? "border-yellow-700 bg-yellow-200 text-yellow-700"
                                : "border-green-700 bg-green-300 text-green-700"
                            }`}
                          >
                            {goal.priority === 1 ? "High Priority" : goal.priority === 2 ? "Medium Priority" : "Low Priority"}
                          </Badge>
                        </CardHeader>
                        <CardContent className="flex-1 flex flex-col gap-4 p-6 pt-0">
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-neutral-content/70 font-medium text-sm poppins">Target Amount</span>
                              <span className="text-neutral-content font-semibold montserrat">₹ {formatIndianNumber(goal.targetAmount)}</span>
                            </div>
                            <div className="border-t border-neutral-content/10 my-1" />
                            <div className="flex justify-between items-center">
                              <span className="text-neutral-content/70 font-medium text-sm poppins">Monthly Required</span>
                              <span className="text-neutral-content font-semibold montserrat">₹ {formatIndianNumber(goal.targetAmount / (goal.yearsToGoal * 12))}</span>
                            </div>
                            <div className="border-t border-neutral-content/10 my-1" />
                            <div className="flex justify-between items-center">
                              <span className="text-neutral-content/70 font-medium text-sm poppins">Years to Goal</span>
                              <span className="text-neutral-content font-semibold montserrat">{goal.yearsToGoal}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <span className={`text-xs text-neutral-content/70 ${poppins}`}>Achievability:</span>
                            <Badge
                              variant="outline"
                              className={`text-xs px-2 py-0.5 ${poppins} ${
                                goal.isAchievable 
                                  ? "border-green-800 bg-green-300 text-green-800" 
                                  : "border-red-800 bg-red-300 text-red-800"
                              }`}
                            >
                              {goal.isAchievable ? "Likely Achievable" : "Challenging"}
                            </Badge>
                          </div>
                          <div className="border-t border-neutral-content/20 mt-4"></div>
                        </CardContent>
                        <div className="flex justify-between items-center gap-2 px-6 pb-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleModifyGoal(goal)}
                            disabled={modifyingGoalId === goal.id}
                            className={`rounded-lg border-neutral-content/20 bg-neutral-content/10 text-neutral-content hover:bg-neutral-content ${poppins} ${
                              modifyingGoalId === goal.id ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                          >
                            {modifyingGoalId === goal.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              "Modify"
                            )}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteGoal(goal.id)}
                            disabled={deletingGoalId === goal.id}
                            className={`rounded-lg border-red-800 bg-red-300 text-red-800 hover:bg-error/10 hover:text-red-800 ${poppins} ${
                              deletingGoalId === goal.id ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                          >
                            {deletingGoalId === goal.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              "Delete"
                            )}
                          </Button>
                        </div>
                      </Card>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full flex flex-col justify-center items-center p-12 rounded-2xl border-2 border-dashed border-border/50 bg-neutral backdrop-blur-sm min-h-[300px]">
                    <PiggyBank className="w-20 h-20 text-muted-foreground/50 mb-6" />
                    <h3 className={`text-xl font-semibold mb-2 text-neutral-content ${montserrat}`}>No Goals Found</h3>
                    <p className={`text-muted-foreground text-center mb-6 max-w-md ${poppins}`}>
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
                          className={`rounded-lg border-neutral-content/20 bg-neutral-content/10 text-neutral-content hover:bg-neutral-content ${poppins}`}
                        >
                          View All Goals
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => router.push("/user/goal/add-goal")}
                        className={`rounded-lg border-neutral-content/20 bg-neutral-content/10 text-neutral-content hover:bg-neutral-content ${poppins}`}
                      >
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Create Goal
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <Disclaimer />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}