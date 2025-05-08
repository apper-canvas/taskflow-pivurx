function SettingsCard({ title, description, children, icon: Icon }) {
  return (
    <div className="card mb-6">
      <div className="flex items-start gap-4 mb-4">
        {Icon && (
          <div className="p-3 bg-primary/10 dark:bg-primary/20 rounded-xl">
            <Icon className="w-6 h-6 text-primary" />
          </div>
        )}
        <div>
          <h3 className="text-lg font-medium text-surface-800 dark:text-surface-100">{title}</h3>
          {description && (
            <p className="text-sm text-surface-600 dark:text-surface-400 mt-1">{description}</p>
          )}
        </div>
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}

export default SettingsCard;