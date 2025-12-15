import { Shield } from 'lucide-react';

const SecuredFooter = () => {
  return (
    <div className="flex items-center justify-center gap-2 py-4 text-muted-foreground">
      <Shield className="w-4 h-4" />
      <span className="text-xs font-medium">Secured by Banque Misr Banking</span>
    </div>
  );
};

export default SecuredFooter;
