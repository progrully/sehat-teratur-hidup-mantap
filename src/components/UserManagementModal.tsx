
import React, { useState } from "react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

interface UserManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type UserRole = "patient" | "nurse" | "admin";

const UserManagementModal = ({ isOpen, onClose }: UserManagementModalProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("password123");
  const [role, setRole] = useState<UserRole>("patient");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register } = useAuth();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Register the new user
      const success = await register(name, email, password, role);
      
      if (success) {
        toast.success(`Pengguna baru dengan peran ${getRoleName(role)} berhasil ditambahkan`);
        resetForm();
        onClose();
      } else {
        toast.error("Gagal menambahkan pengguna baru");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan saat menambahkan pengguna");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("password123");
    setRole("patient");
  };
  
  const getRoleName = (role: UserRole) => {
    switch (role) {
      case "patient": return "Pasien";
      case "nurse": return "Perawat";
      case "admin": return "Admin";
      default: return "Pengguna";
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Tambah Pengguna Baru</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nama</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Masukkan nama pengguna"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Masukkan email pengguna"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password Default</Label>
            <Input
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password default"
              required
            />
            <p className="text-xs text-gray-500">Password default akan diberikan ke pengguna baru</p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="role">Peran</Label>
            <Select 
              value={role} 
              onValueChange={(value) => setRole(value as UserRole)}
            >
              <SelectTrigger id="role" className="w-full">
                <SelectValue placeholder="Pilih peran pengguna" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="patient">Pasien</SelectItem>
                <SelectItem value="nurse">Perawat</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <DialogFooter className="pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              disabled={isSubmitting}
            >
              Batal
            </Button>
            <Button 
              type="submit"
              className="bg-imo-blue hover:bg-blue-700 text-white" 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Menambahkan..." : "Tambah Pengguna"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UserManagementModal;
