# IPG Custom ERP - Host & Cloud Synchronization Reference

This document provides exact paths and credentials reference to ensure full synchronization between the standalone ERP workspace and the host environment:

| Property | Value |
| :--- | :--- |
| **Primary Host Directory** | `C:\Users\micha\Desktop\Iron-Prairie-Website` |
| **Custom ERP Subfolder** | `C:\Users\micha\Desktop\Iron-Prairie-Website\IPG-Custom-ERP` |
| **Firebase Project ID** | `iron-prairie-website` (Owner: `alicia@ironprairiefabrication.com`, Editor: `michael@universal-dynamic.com`) |
| **Git Remote Origin** | `https://github.com/alicia835/iron-prairie-website.git` (Owner: `alicia835`, Contributor: `Michaelh-UDCS`) |
| **Default ERP Port** | `http://localhost:5174` |
| **Parent Web App Port** | `http://localhost:5173` |
| **Sales Trigger Email** | `Sales@ironprairiefabrication.com` |
| **Accounting Remittance** | `ap@ironprairiefabrication.com` / `ar@ironprairiefabrication.com` |

---

### Quick Git Commit & Push Script
From within this folder or the parent:
```powershell
Set-Location "C:\Users\micha\Desktop\Iron-Prairie-Website"
git add .
git commit -m "feat(erp): Update IPG Custom ERP Workspace"
git push origin master
```
