# Booking Management UI

This React application utilizes Redux RTK for state management and TypeScript for static typing.

## Features

- **Listing and Detailing Stays**
- **Booking Management**
- **Responsive Interface**

## Technologies

- **React**
- **Redux Toolkit**
- **Tailwind CSS**
- **TypeScript**
- **React Router**
 
## Good Practices
- **Smart/Dumb Components**
- **Hooks**
- **Selectors**
- **Router**
- **Context**
- **Well-Organized Code and Folder Structure**

## Project Structure

```plaintext
src/
├─ app                                          
│  ├─ App.tsx                                   
│  └─ store.ts                                  
├─ components                                   
│  ├─ common                                    
│  │  ├─ Avatar                                 
│  │  │  ├─ Avatar.tsx                          
│  │  │  └─ index.ts                            
│  │  └─ index.ts                               
│  └─ layout                                    
│     ├─ Header                                 
│     │  ├─ Header.tsx                          
│     │  └─ index.ts                            
│     └─ index.js                               
├─ contexts                                     
│  └─ ToastContext.tsx                          
├─ data                                         
├─ features                                     
│  ├─ booking                                   
│  │  └─ bookingSlice.ts                        
│  ├─ filters                                   
│  │  └─ filtersSlice.ts                        
│  └─ stays                                     
│     ├─ StaysList.tsx                          
│     ├─ staysService.ts                        
│     └─ staysSlice.ts                          
├─ hooks                                        
│  ├─ useFilterChange.ts                        
├─ icons                                        
├─ images                                       
├─ pages                                        
│  └─ StaysListPage.tsx                         
├─ routers                                      
│  ├─ index.tsx                                 
│  ├─ navigation.ts                             
│  └─ router.tsx                                
├─ selectors                                    
│  ├─ bookingSelectors.ts                       
├─ styles                                       
├─ types                                        
├─ utils                                        
│  ├─ bookingOperations.ts                      
```

#### `features` folder in Redux (RTK)

Using Redux (RTK) for state management

- **Each subfolder within features corresponds to a unique slice in RTK.**
    - `stays`
    - `booking`
    - `filters`
- **A slice includes reducers, actions, and the state specific to a feature of the application**
- **Aligns with RTK's approach to reduce Redux boilerplate**
- **Simplifies adding new features and scaling the application**
- **Localizes changes to specific features, reducing the impact on unrelated parts of the app**
- **Improves the overall maintainability and reliability of the application**
```
