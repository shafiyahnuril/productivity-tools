"use client";

import Image from "next/image";
import { useState, useMemo } from "react";
import { Heading1, Heading2, Text, Caption } from "../components/ui/Typography";
import { Card } from "../components/ui/Card";
import { Button, Tag } from "../components/ui/Elements";
import { Edit2, Check, X, Camera } from "lucide-react";
import { useStore } from "../store/useStore";

export default function AccountPage() {
  const { todos, notes, timerState } = useStore();

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("Sarah Anderson");
  const [email, setEmail] = useState("sarah.anderson@email.com");
  const [bio, setBio] = useState(
    "Student & productivity enthusiast. Always learning, always growing.",
  );
  const [avatarSrc, setAvatarSrc] = useState(
    "https://i.pravatar.cc/150?img=47",
  );
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);

  const PRESET_AVATARS = [
    "https://i.pravatar.cc/150?img=47",
    "https://i.pravatar.cc/150?img=44",
    "https://i.pravatar.cc/150?img=45",
    "https://i.pravatar.cc/150?img=48",
    "https://i.pravatar.cc/150?img=49",
    "https://i.pravatar.cc/150?img=50",
    "https://i.pravatar.cc/150?img=51",
    "https://i.pravatar.cc/150?img=52",
    "https://i.pravatar.cc/150?img=53",
  ];

  const [draftName, setDraftName] = useState(name);
  const [draftEmail, setDraftEmail] = useState(email);
  const [draftBio, setDraftBio] = useState(bio);

  const stats = useMemo(
    () => ({
      completed: todos.filter((t) => t.completed).length,
      totalTasks: todos.length,
      totalNotes: notes.length,
      focusSessions: timerState.history.filter(
        (h) => h.type === "focus" && h.completed,
      ).length,
    }),
    [todos, notes, timerState.history],
  );

  const handleEdit = () => {
    setDraftName(name);
    setDraftEmail(email);
    setDraftBio(bio);
    setEditing(true);
  };

  const handleSave = () => {
    setName(draftName.trim() || name);
    setEmail(draftEmail.trim() || email);
    setBio(draftBio.trim() || bio);
    setEditing(false);
  };

  const handleCancel = () => {
    setEditing(false);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-10">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-primary/20 shrink-0">
            <Image
              src={avatarSrc}
              alt="Profile"
              width={48}
              height={48}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <Heading1>My Account</Heading1>
            <Text className="text-foreground-secondary">
              Manage your profile and preferences.
            </Text>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-3">
          {!editing ? (
            <Button
              onClick={handleEdit}
              className="hidden! md:inline-flex! items-center gap-2"
            >
              <Edit2 className="w-4 h-4" /> Edit Profile
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleCancel}
                className="hidden! md:inline-flex! items-center gap-2"
              >
                <X className="w-4 h-4" /> Cancel
              </Button>
              <Button
                onClick={handleSave}
                className="hidden! md:inline-flex! items-center gap-2"
              >
                <Check className="w-4 h-4" /> Save
              </Button>
            </div>
          )}
        </div>
      </header>

      {/* Divider */}
      <div
        className="h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, var(--border) 50%, transparent 100%)",
        }}
      />

      {/* Profile + Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
        {/* Profile card */}
        <Card className="md:col-span-1 flex flex-col items-center text-center gap-4">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-primary/20 ring-4 ring-primary/20">
              <Image
                src={avatarSrc}
                alt="Profile"
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            </div>
            <button
              onClick={() => setShowAvatarPicker(true)}
              className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shadow-md hover:bg-primary/80 transition-colors"
              title="Ganti foto profil"
            >
              <Camera className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-1">
            <Heading2>{name}</Heading2>
            <Text className="text-foreground-secondary text-xs">{email}</Text>
          </div>

          <div
            className="w-full h-px"
            style={{ background: "var(--border)" }}
          />

          <Text className="text-foreground-secondary text-sm text-center leading-relaxed">
            {bio}
          </Text>

          <div className="flex flex-wrap gap-2 justify-center">
            <Tag colorClassName="bg-primary/15 text-primary">Student</Tag>
            <Tag colorClassName="bg-success/15 text-success">Productive</Tag>
          </div>

          {/* Mobile action buttons */}
          <div className="flex gap-2 w-full md:hidden">
            {!editing ? (
              <Button
                onClick={handleEdit}
                className="flex-1 flex items-center justify-center gap-2"
              >
                <Edit2 className="w-4 h-4" /> Edit Profile
              </Button>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  className="flex-1 flex items-center justify-center gap-2"
                >
                  <X className="w-4 h-4" /> Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  className="flex-1 flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" /> Save
                </Button>
              </>
            )}
          </div>
        </Card>

        {/* Right column */}
        <div className="md:col-span-2 space-y-4">
          {/* Stats */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-6 rounded-full bg-primary/40" />
              <Heading2 className="text-xs! font-bold! uppercase! tracking-widest!">
                Activity Stats
              </Heading2>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <Card className="flex flex-col items-center text-center gap-1 p-4!">
                <Heading2 className="text-2xl!">{stats.completed}</Heading2>
                <Caption className="text-foreground-secondary">
                  Tasks Done
                </Caption>
              </Card>
              <Card className="flex flex-col items-center text-center gap-1 p-4!">
                <Heading2 className="text-2xl!">{stats.totalNotes}</Heading2>
                <Caption className="text-foreground-secondary">Notes</Caption>
              </Card>
              <Card className="flex flex-col items-center text-center gap-1 p-4!">
                <Heading2 className="text-2xl!">
                  {stats.focusSessions}
                </Heading2>
                <Caption className="text-foreground-secondary">
                  Focus Sessions
                </Caption>
              </Card>
            </div>
          </div>

          {/* Edit form / profile details */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-6 rounded-full bg-primary/40" />
              <Heading2 className="text-xs! font-bold! uppercase! tracking-widest!">
                Profile Details
              </Heading2>
            </div>
            <Card className="space-y-4">
              {/* Name */}
              <div className="space-y-1.5">
                <Caption>Full Name</Caption>
                {editing ? (
                  <input
                    value={draftName}
                    onChange={(e) => setDraftName(e.target.value)}
                    className="w-full px-3 py-2 bg-surface-elevated rounded-xl border border-border text-sm focus:outline-none focus:border-primary"
                  />
                ) : (
                  <Text className="px-3 py-2 bg-surface-elevated rounded-xl border border-border">
                    {name}
                  </Text>
                )}
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <Caption>Email Address</Caption>
                {editing ? (
                  <input
                    type="email"
                    value={draftEmail}
                    onChange={(e) => setDraftEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-surface-elevated rounded-xl border border-border text-sm focus:outline-none focus:border-primary"
                  />
                ) : (
                  <Text className="px-3 py-2 bg-surface-elevated rounded-xl border border-border">
                    {email}
                  </Text>
                )}
              </div>

              {/* Bio */}
              <div className="space-y-1.5">
                <Caption>Bio</Caption>
                {editing ? (
                  <textarea
                    value={draftBio}
                    onChange={(e) => setDraftBio(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 bg-surface-elevated rounded-xl border border-border text-sm focus:outline-none focus:border-primary resize-none"
                  />
                ) : (
                  <Text className="px-3 py-2 bg-surface-elevated rounded-xl border border-border leading-relaxed">
                    {bio}
                  </Text>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Avatar Picker Modal */}
      {showAvatarPicker && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-surface rounded-2xl p-6 w-full max-w-sm shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-base font-bold">Pilih Foto Profil</h2>
              <button
                onClick={() => setShowAvatarPicker(false)}
                className="p-1.5 hover:bg-surface-elevated rounded-lg text-foreground-secondary"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {PRESET_AVATARS.map((src) => (
                <button
                  key={src}
                  onClick={() => {
                    setAvatarSrc(src);
                    setShowAvatarPicker(false);
                  }}
                  className={`relative rounded-2xl overflow-hidden aspect-square ring-2 transition-all hover:scale-105 ${
                    avatarSrc === src
                      ? "ring-primary shadow-md"
                      : "ring-transparent hover:ring-border"
                  }`}
                >
                  <Image src={src} alt="Avatar" fill className="object-cover" />
                  {avatarSrc === src && (
                    <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                      <Check className="w-6 h-6 text-white drop-shadow" />
                    </div>
                  )}
                </button>
              ))}
            </div>
            <p className="text-xs text-foreground-secondary text-center mt-4">
              Klik avatar untuk memilih
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
