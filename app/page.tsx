import Image from "next/image";

import { Heading1, Heading2, Text } from "./components/ui/Typography";
import { Card } from "./components/ui/Card";
import { Button, Tag } from "./components/ui/Elements";
import { Search, Filter, Plus, MoreHorizontal } from "lucide-react";
import { DashboardClient } from "./DashboardClient";
import { SwipeableItem } from "./components/ui/SwipeableItem";

export default function Home() {
  return (
    <DashboardClient>
      <div className="max-w-7xl mx-auto space-y-8 pb-10">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-primary/20 shrink-0">
              <Image
                src="https://i.pravatar.cc/150?img=47"
                alt="Profile"
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <Heading1>Hi, Sarah! 👋</Heading1>
              <Text className="text-foreground-secondary">
                Welcome! Let&apos;s make today awesome.
              </Text>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button className="hidden md:flex items-center gap-2">
              <Plus className="w-4 h-4" /> Add New
            </Button>
            <div className="relative hidden md:block">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-foreground-secondary" />
              <input
                type="text"
                placeholder="Search notes, tasks..."
                className="pl-9 pr-4 py-2 bg-surface-elevated rounded-full border border-border text-sm focus:outline-none focus:border-primary w-full md:w-70"
              />
            </div>
            <button className="md:hidden p-2.5 rounded-xl bg-surface-elevated border border-border text-foreground-secondary shadow-sm">
              <Search className="w-4 h-4" />
            </button>
            <button className="p-2.5 rounded-xl bg-surface-elevated border border-border text-foreground-secondary hover:text-foreground shadow-sm">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Main Grid */}
        <div className="flex flex-col md:grid md:grid-cols-4 gap-6">
          {/* Left Column (Focus Timer) */}
          <div className="md:col-span-1 flex flex-col gap-4">
            <div className="hidden md:flex justify-between items-center">
              <Heading2>Focus Timer</Heading2>
            </div>
            <Card className="stagger-card flex-1 flex md:flex-col flex-row items-center justify-between md:justify-center p-4 md:p-6 w-full gap-4">
              <div className="w-full hidden md:flex justify-end mb-2">
                <MoreHorizontal className="w-5 h-5 text-foreground-secondary" />
              </div>

              <div className="flex md:w-40 md:h-40 md:rounded-full md:border-8 border-surface-elevated md:border-l-primary md:border-t-primary md:border-r-primary flex-col items-center justify-center md:mb-8 relative shrink-0">
                <div className="hidden md:block absolute -top-4 bg-surface px-2 text-xl">
                  🍅
                </div>
                <div className="flex flex-col md:items-center">
                  <Heading2 className="md:hidden mb-1">Focus Timer</Heading2>
                  <div className="text-sm text-foreground-secondary mb-1 hidden md:block">
                    Pomodoro
                  </div>
                  <div className="text-4xl font-bold tracking-tight">25:00</div>
                </div>
              </div>

              <div className="flex gap-2 md:gap-4 md:mb-8 grid-cols-3">
                <button className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary-light transition-colors shrink-0">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
                <button className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-surface-elevated text-foreground flex items-center justify-center hover:bg-border transition-colors shrink-0">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  </svg>
                </button>
                <button className="hidden md:flex w-10 h-10 md:w-12 md:h-12 rounded-full bg-surface-elevated text-foreground items-center justify-center hover:bg-border transition-colors shrink-0">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                    <path d="M3 3v5h5" />
                  </svg>
                </button>
              </div>

              <div className="hidden md:flex gap-2 w-full justify-center pb-6 mt-auto">
                <button className="px-4 py-1.5 rounded-full bg-primary text-white text-sm font-medium">
                  25
                </button>
                <button className="px-4 py-1.5 rounded-full bg-surface-elevated text-foreground text-sm font-medium">
                  10
                </button>
                <button className="px-4 py-1.5 rounded-full bg-surface-elevated text-foreground text-sm font-medium">
                  5
                </button>
              </div>

              <div className="w-full pt-4 text-left border-t border-border">
                <div className="text-sm font-medium mb-3">Session log</div>
                <div className="flex justify-between text-xs mb-2 items-center">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>{" "}
                    25:00 - Pomodoro
                  </div>
                  <span className="text-foreground-secondary">25 min</span>
                </div>
                <div className="flex justify-between text-xs items-center">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-surface-elevated"></span>{" "}
                    25:00 - Session
                  </div>
                  <span className="text-foreground-secondary">25 min</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Middle Column (Dashboard & Notes & Calendar) */}
          <div className="md:col-span-2 flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <Heading2>Dashboard</Heading2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 stagger-card">
                <Card className="flex flex-col justify-center">
                  <div className="text-xs text-foreground-secondary mb-2">
                    Total Focus Time
                  </div>
                  <div className="text-3xl font-bold">22h</div>
                  <div className="text-[10px] text-foreground-secondary mt-1">
                    Focus Time This Week
                  </div>
                </Card>
                <Card className="flex flex-col justify-center">
                  <div className="w-6 h-1 rounded-full bg-primary mb-3"></div>
                  <div className="text-3xl font-bold">64</div>
                  <div className="text-[10px] text-foreground-secondary mt-1">
                    Notes Created
                  </div>
                </Card>
                <Card className="flex flex-col justify-center">
                  <div className="w-6 h-1 rounded-full bg-success mb-3"></div>
                  <div className="text-3xl font-bold">46</div>
                  <div className="text-[10px] text-foreground-secondary mt-1">
                    Completed Tasks
                  </div>
                </Card>
                <Card className="flex flex-col justify-center">
                  <div className="w-6 h-1 rounded-full bg-warning mb-3"></div>
                  <div className="text-3xl font-bold">4</div>
                  <div className="text-[10px] text-foreground-secondary mt-1">
                    Upcoming Deadlines
                  </div>
                </Card>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-2">
              <div className="flex flex-col gap-4">
                <Heading2>Notes</Heading2>
                <div className="space-y-3 flex-1 flex flex-col">
                  <Card
                    elevated
                    className="border-l-[6px] border-l-primary cursor-pointer hover:bg-surface transition-colors p-4"
                  >
                    <div className="font-semibold text-sm mb-1">
                      History Ch. 5
                    </div>
                    <div className="text-xs text-foreground-secondary mb-3 line-clamp-2">
                      The story of reads about conceituous and other n...
                    </div>
                    <div className="flex gap-2">
                      <Tag colorClassName="bg-primary/20 text-primary">
                        Assignment
                      </Tag>
                      <Tag colorClassName="bg-warning/20 text-warning">
                        Exam
                      </Tag>
                    </div>
                  </Card>
                  <Card
                    elevated
                    className="border-l-[6px] border-l-success cursor-pointer hover:bg-surface transition-colors p-4"
                  >
                    <div className="font-semibold text-sm mb-1">
                      Biology Lab Report
                    </div>
                    <div className="text-xs text-foreground-secondary mb-3 line-clamp-2">
                      Complete student with biological and sympatric to recivera
                      how...
                    </div>
                    <div className="flex gap-2">
                      <Tag colorClassName="bg-success/20 text-success">
                        Study
                      </Tag>
                    </div>
                  </Card>
                  <Card
                    elevated
                    className="border-l-[6px] border-l-warning cursor-pointer hover:bg-surface transition-colors p-4"
                  >
                    <div className="font-semibold text-sm mb-1">
                      Essay Ideas
                    </div>
                    <div className="text-xs text-foreground-secondary mb-3 line-clamp-2">
                      Read for studying writes and reaches can be am...
                    </div>
                    <div className="flex gap-2">
                      <Tag colorClassName="bg-warning/20 text-warning">
                        Study
                      </Tag>
                    </div>
                  </Card>
                  <Button className="w-full mt-auto" variant="primary">
                    New Note
                  </Button>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <Heading2>Calendar</Heading2>
                <Card className="stagger-card flex-1">
                  <div className="flex justify-between items-center mb-4">
                    <button className="text-foreground-secondary hover:text-foreground">
                      &lt;
                    </button>
                    <div className="text-sm font-semibold">Monthly</div>
                    <button className="text-foreground-secondary hover:text-foreground">
                      &gt;
                    </button>
                  </div>

                  <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium mb-4">
                    <div className="text-foreground-secondary">Su</div>
                    <div>Mo</div>
                    <div>Tu</div>
                    <div>We</div>
                    <div>Th</div>
                    <div>Fr</div>
                    <div>Sa</div>
                  </div>
                  <div className="grid grid-cols-7 gap-y-2 gap-x-1 text-center text-xs mb-6">
                    <div className="text-foreground-secondary">30</div>
                    <div className="text-foreground-secondary">31</div>
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                    <div>4</div>
                    <div>5</div>
                    <div>6</div>
                    <div>7</div>
                    <div>8</div>
                    <div>9</div>
                    <div>10</div>
                    <div>11</div>
                    <div className="bg-warning/20 text-warning rounded-full w-6 h-6 flex items-center justify-center mx-auto">
                      12
                    </div>
                    <div>13</div>
                    <div>14</div>
                    <div className="bg-primary/20 text-primary rounded-full w-6 h-6 flex items-center justify-center mx-auto">
                      15
                    </div>
                    <div className="bg-primary/20 text-primary rounded-full w-6 h-6 flex items-center justify-center mx-auto">
                      16
                    </div>
                    <div className="bg-primary/20 text-primary rounded-full w-6 h-6 flex items-center justify-center mx-auto">
                      17
                    </div>
                    <div>18</div>
                    <div>19</div>
                    <div>20</div>
                    <div>21</div>
                    <div>22</div>
                    <div>23</div>
                    <div>24</div>
                    <div>25</div>
                    <div>26</div>
                    <div>27</div>
                    <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center mx-auto">
                      28
                    </div>
                    <div>29</div>
                    <div>30</div>
                    <div>31</div>
                    <div className="text-foreground-secondary">1</div>
                    <div className="text-foreground-secondary">2</div>
                  </div>

                  <div className="border-t border-border pt-4 mt-auto">
                    <div className="text-sm font-semibold mb-3">
                      Today&apos;s Events
                    </div>
                    <div className="space-y-3">
                      <div className="flex gap-3 relative before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-primary before:rounded-full pl-3">
                        <div>
                          <div className="text-xs font-semibold">
                            Assignments & Exams
                          </div>
                          <div className="text-[10px] text-foreground-secondary mt-0.5">
                            Exam - 10:00 AM
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-3 relative before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-success before:rounded-full pl-3 mt-1">
                        <div>
                          <div className="text-xs font-semibold">
                            Study sessions
                          </div>
                          <div className="text-[10px] text-foreground-secondary mt-0.5">
                            Study - 02:00 PM
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>

          {/* Right Column (To-Do & Analytics) */}
          <div className="md:col-span-1 flex flex-col gap-4">
            <Heading2>To-Do List</Heading2>

            <div className="bg-surface-elevated p-1 rounded-xl flex">
              <button className="flex-1 text-xs py-2 bg-surface shadow-sm rounded-lg font-medium">
                All
              </button>
              <button className="flex-1 text-xs py-2 text-foreground-secondary font-medium">
                I was mentioned
              </button>
            </div>

            <div className="flex justify-between items-center mt-2">
              <div className="text-sm font-semibold">Today&apos;s Tasks</div>
              <div className="flex gap-2 items-center">
                <span className="md:hidden text-[10px] text-primary">
                  View All
                </span>
                <MoreHorizontal className="w-4 h-4 text-foreground-secondary" />
              </div>
            </div>

            <div className="space-y-3">
              <SwipeableItem>
                <Card className="p-3 flex gap-3">
                  <div className="mt-0.5">
                    <div className="w-4 h-4 rounded border border-border"></div>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold">Submit Math HW</div>
                    <div className="flex gap-2 mt-2 items-center">
                      <Tag colorClassName="bg-primary/20 text-primary">
                        Assignment
                      </Tag>
                      <Tag colorClassName="bg-warning/20 text-warning">
                        Exam
                      </Tag>
                    </div>
                  </div>
                  <div className="text-xs text-foreground-secondary mt-1">
                    10:00 AM
                  </div>
                </Card>
              </SwipeableItem>

              <SwipeableItem>
                <Card className="p-3 flex gap-3">
                  <div className="mt-0.5">
                    <div className="w-4 h-4 rounded border border-border"></div>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold">
                      Revise Chemistry
                    </div>
                    <div className="flex gap-2 mt-2 items-center">
                      <Tag colorClassName="bg-warning/20 text-warning">
                        Exam
                      </Tag>
                      <Tag colorClassName="bg-success/20 text-success">
                        Study
                      </Tag>
                    </div>
                  </div>
                  <div className="text-xs text-foreground-secondary mt-1">
                    02:00 PM
                  </div>
                </Card>
              </SwipeableItem>

              <SwipeableItem>
                <Card className="p-3 flex gap-3">
                  <div className="mt-0.5">
                    <div className="w-4 h-4 rounded border border-border"></div>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold">Read Article</div>
                    <div className="flex gap-2 mt-2 items-center">
                      <Tag colorClassName="bg-primary/20 text-primary flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />{" "}
                        Study
                      </Tag>
                    </div>
                  </div>
                  <div className="text-[10px] text-success font-medium bg-success/20 px-2 py-1 rounded-md h-fit mt-1">
                    10:00 AM
                  </div>
                </Card>
              </SwipeableItem>
            </div>

            <Heading2 className="mt-4">Analytics Preview</Heading2>
            <Card>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="text-[11px] text-foreground-secondary">
                    Weekly focus hour trend
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[11px] text-foreground-secondary">
                    Task Completion Rate
                  </div>
                </div>
              </div>

              <div className="flex gap-4 items-end">
                <div className="flex-1 h-20 flex relative">
                  {/* SVG mock for line chart */}
                  <div className="absolute left-0 bottom-0 top-0 flex flex-col justify-between text-[8px] text-foreground-secondary py-1">
                    <span>12</span>
                    <span>9</span>
                    <span>6</span>
                    <span>3</span>
                    <span>0</span>
                  </div>
                  <div className="ml-4 flex-1 h-full relative">
                    {/* subtle grid lines */}
                    <div className="absolute w-full border-t border-border top-0"></div>
                    <div className="absolute w-full border-t border-border top-1/4"></div>
                    <div className="absolute w-full border-t border-border top-2/4"></div>
                    <div className="absolute w-full border-t border-border top-3/4"></div>
                    <div className="absolute w-full border-t border-border bottom-0"></div>

                    <svg
                      className="absolute inset-0 w-full h-full"
                      viewBox="0 0 100 100"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M0,80 C10,40 20,90 30,70 C40,50 50,20 60,30 C70,40 80,10 100,0"
                        fill="none"
                        stroke="var(--color-primary)"
                        strokeWidth="2"
                      />
                      <path
                        d="M0,80 C10,40 20,90 30,70 C40,50 50,20 60,30 C70,40 80,10 100,0 L100,100 L0,100 Z"
                        fill="var(--color-primary-light)"
                        fillOpacity="0.2"
                      />
                    </svg>
                  </div>
                </div>
                <div className="w-14 h-14 rounded-full border-[5px] border-t-primary border-r-success border-b-warning border-l-border mb-2"></div>
              </div>
              <div className="flex justify-between text-[8px] text-foreground-secondary mt-2 w-2/3 ml-4">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardClient>
  );
}
