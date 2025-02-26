import { useState, useCallback, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Loader2, Check, ChevronsUpDown, X, Users } from "lucide-react"
import debounce from "lodash.debounce"
import { Input } from "@/components/ui/input"
import { Header } from '@/components/layouts/header'
import { Main } from '@/components/layouts/main'
import { ProfileDropdown } from '@/components/molecules/profile-dropdown'
import UsersProvider from '@/features/users/context/users-context'
import {UsersDialogs} from "@/features/users/components/users-dialogs.tsx";

export default function AdminNotification() {
  const [title, setTitle] = useState("")
  const [targetType, setTargetType] = useState<string>("all")
  const [selectedUsers, setSelectedUsers] = useState<any[]>([])
  const [message, setMessage] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [commandOpen, setCommandOpen] = useState(false)
  
  const fetchUsers = useCallback(async (search: string, page: number) => {
    setLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      
      const mockUsers = Array.from({ length: 10 }, (_, i) => ({
        id: page * 10 + i,
        name: `User ${page * 10 + i}`,
        email: `user${page * 10 + i}@example.com`,
        avatar: `/placeholder.svg?height=32&width=32`,
      }))
      
      if (search) {
        const filtered = mockUsers.filter(
          (user) =>
            user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase()),
        )
        setUsers((prev) => (page === 1 ? filtered : [...prev, ...filtered]))
        setHasMore(filtered.length === 10)
      } else {
        setUsers((prev) => (page === 1 ? mockUsers : [...prev, ...mockUsers]))
        setHasMore(mockUsers.length === 10)
      }
    } catch (error) {
      console.error("Error fetching users:", error)
    } finally {
      setLoading(false)
    }
  }, [])
  
  const debouncedSearch = useCallback(
    debounce((search: string) => {
      setPage(1)
      fetchUsers(search, 1)
    }, 300),
    [],
  )
  
  useEffect(() => {
    debouncedSearch(searchTerm)
    return () => debouncedSearch.cancel()
  }, [searchTerm, debouncedSearch])
  
  useEffect(() => {
    setPage(1)
    fetchUsers("", 1)
  }, [fetchUsers])
  
  const handleTargetChange = (value: string) => {
    setTargetType(value)
    setSelectedUsers([])
    setSearchTerm("")
    setPage(1)
    if (value !== "all") {
      setCommandOpen(true)
    }
  }
  
  const handleUserSelect = (user: any) => {
    if (targetType === "single") {
      setSelectedUsers([user])
    } else {
      setSelectedUsers((prev) => {
        if (prev.find((u) => u.id === user.id)) {
          return prev.filter((u) => u.id !== user.id)
        }
        return [...prev, user]
      })
    }
  }
  
  const handleSendNotification = async () => {
    console.log({
      title,
      targetType,
      selectedUsers: selectedUsers.map((u) => u.id),
      message,
    })
  }
  
  return (
    <UsersProvider>
      <Header fixed>
        {/*<Search />*/}
        <div className='ml-auto flex items-center space-x-4'>
          {/*<ThemeSwitch />*/}
          <ProfileDropdown />
        </div>
      </Header>
      
      <Main>
        <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Notifications</h2>
            <p className='text-muted-foreground'>
              Manage users you send notifications too.
            </p>
          </div>
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <Card className="w-full max-w-2xl mx-auto pt-5">
            <CardHeader>
              <CardTitle>Send Notification</CardTitle>
              <CardDescription>Send notifications to your users</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Title</label>
                  <span className="text-xs text-muted-foreground">{title.length}/25 characters</span>
                </div>
                <Input
                  placeholder="Notification title..."
                  value={title}
                  onChange={(e) => {
                    if (e.target.value.length <= 25) {
                      setTitle(e.target.value)
                    }
                  }}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Target Audience</label>
                <Select onValueChange={handleTargetChange} defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Select target audience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Users</SelectItem>
                    <SelectItem value="selected">Selected Users</SelectItem>
                    <SelectItem value="single">Single User</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {(targetType === "selected" || targetType === "single") && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">{targetType === "single" ? "Select User" : "Select Users"}</label>
                  
                  <div className="flex flex-wrap gap-2 min-h-[2.5rem] p-2 border rounded-md">
                    {selectedUsers.map((user) => (
                      <Badge key={user.id} variant="secondary" className="flex items-center gap-1">
                        <Avatar className="h-4 w-4">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>{user.name[0]}</AvatarFallback>
                        </Avatar>
                        {user.name}
                        <button
                          onClick={() => setSelectedUsers((prev) => prev.filter((u) => u.id !== user.id))}
                          className="ml-1 hover:bg-muted rounded"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  
                  <Popover open={commandOpen} onOpenChange={setCommandOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={commandOpen}
                        className="w-full justify-between"
                      >
                  <span className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    {selectedUsers.length > 0
                      ? `${selectedUsers.length} user${selectedUsers.length === 1 ? "" : "s"} selected`
                      : "Select users..."}
                  </span>
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[400px] p-0">
                      <Command>
                        <CommandInput placeholder="Search users..." value={searchTerm} onValueChange={setSearchTerm} />
                        <CommandList>
                          <CommandEmpty>No users found.</CommandEmpty>
                          <CommandGroup>
                            <ScrollArea className="h-[200px]">
                              {users.map((user) => (
                                <CommandItem key={user.id} value={user.id.toString()} onSelect={() => handleUserSelect(user)}>
                                  <div className="flex items-center gap-2 w-full">
                                    <Avatar className="h-6 w-6">
                                      <AvatarImage src={user.avatar} alt={user.name} />
                                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 overflow-hidden">
                                      <p className="truncate">{user.name}</p>
                                      <p className="text-sm text-muted-foreground truncate">{user.email}</p>
                                    </div>
                                    {selectedUsers.find((u) => u.id === user.id) && <Check className="h-4 w-4" />}
                                  </div>
                                </CommandItem>
                              ))}
                              {loading && (
                                <div className="flex items-center justify-center p-4">
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                </div>
                              )}
                              {!loading && hasMore && (
                                <Button variant="ghost" className="w-full" onClick={() => fetchUsers(searchTerm, page + 1)}>
                                  Load more
                                </Button>
                              )}
                            </ScrollArea>
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
              )}
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Message</label>
                  <span className="text-xs text-muted-foreground">{message.length}/50 characters</span>
                </div>
                <Textarea
                  placeholder="Type your notification message here..."
                  value={message}
                  onChange={(e) => {
                    if (e.target.value.length <= 50) {
                      setMessage(e.target.value)
                    }
                  }}
                  className="min-h-[100px]"
                />
              </div>
              
              {message && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Preview</label>
                  <Card>
                    <CardContent className="pt-6">
                      <p className="text-sm">{message}</p>
                    </CardContent>
                  </Card>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleSendNotification}
                disabled={!title || !message || (targetType !== "all" && selectedUsers.length === 0)}
                className="w-full"
              >
                Send Notification
              </Button>
            </CardFooter>
          </Card>
          </div>
      </Main>
      
      <UsersDialogs />
    </UsersProvider>
  )
}

