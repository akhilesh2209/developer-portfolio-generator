'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Link from 'next/link'
import { Save, Eye, Code } from 'lucide-react'

export default function TemplateEditorPage() {
  const templateName =
  typeof window !== "undefined"
    ? localStorage.getItem("template") || "modern"
    : "modern";
  const [activeTab, setActiveTab] = useState('about')
  const [formData, setFormData] = useState({
    about: 'I\'m a passionate full-stack developer with expertise in modern web technologies.',
    skills: 'React, TypeScript, Node.js, PostgreSQL, Tailwind CSS',
    headline: 'Full Stack Developer'
  })
  const [isSaving, setIsSaving] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    // TODO: Save to database
    setTimeout(() => setIsSaving(false), 500)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Edit Template</h1>
          <p className="text-muted-foreground mt-1">
  {templateName} Template
</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="https://example.vercel.app" target="_blank">
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Link>
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Editor Panel */}
        <Card className="lg:col-span-2 p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
            </TabsList>

            {/* About Tab */}
            <TabsContent value="about" className="space-y-4 mt-4">
              <div>
                <label className="text-sm font-medium">Headline</label>
                <Input
                  name="headline"
                  value={formData.headline}
                  onChange={handleChange}
                  placeholder="Your professional headline"
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium">About You</label>
                <Textarea
                  name="about"
                  value={formData.about}
                  onChange={handleChange}
                  placeholder="Tell visitors about yourself"
                  className="mt-1 min-h-[200px]"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {formData.about.length}/500 characters
                </p>
              </div>
            </TabsContent>

            {/* Skills Tab */}
            <TabsContent value="skills" className="space-y-4 mt-4">
              <div>
                <label className="text-sm font-medium">Skills</label>
                <Textarea
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="Add your skills separated by commas"
                  className="mt-1 min-h-[200px]"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Separate skills with commas
                </p>
              </div>
            </TabsContent>

            {/* Projects Tab */}
            <TabsContent value="projects" className="space-y-4 mt-4">
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  Manage your projects from the Projects page
                </p>
                <Button variant="outline" className="mt-4" asChild>
                  <Link href="/dashboard/projects">
                    Go to Projects
                  </Link>
                </Button>
              </div>
            </TabsContent>

            {/* Contact Tab */}
            <TabsContent value="contact" className="space-y-4 mt-4">
              <div>
                <label className="text-sm font-medium">Email</label>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium">GitHub</label>
                <Input
                  placeholder="github.com/username"
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium">LinkedIn</label>
                <Input
                  placeholder="linkedin.com/in/username"
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Twitter</label>
                <Input
                  placeholder="@username"
                  className="mt-1"
                />
              </div>
            </TabsContent>
          </Tabs>
        </Card>

        {/* Preview Panel */}
        <Card className="p-6 sticky top-4 h-fit">
          <h3 className="font-bold mb-4">Live Preview</h3>
          <div className="space-y-4 text-sm">
            <div className="rounded-lg border border-border p-4 bg-muted/50">
              <h4 className="font-bold text-lg">{formData.headline}</h4>
              <p className="text-xs text-primary">
  Template: {templateName}
</p>
              <p className="text-xs text-muted-foreground mt-2 line-clamp-3">
                {formData.about}
              </p>
            </div>

            <Separator />

            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-2">SKILLS</p>
              <div className="flex flex-wrap gap-2">
                {formData.skills.split(',').map((skill, idx) => (
                  <Badge key={idx} variant="secondary">
                    {skill.trim()}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="pt-4 space-y-2">
              <p className="text-xs font-semibold text-muted-foreground">ACTIONS</p>
              <Button size="sm" className="w-full" asChild>
                <Link href="https://example.vercel.app" target="_blank">
                  View Full Portfolio
                </Link>
              </Button>
              <Button size="sm" variant="outline" className="w-full">
                <Code className="h-4 w-4 mr-2" />
                Export Code
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
