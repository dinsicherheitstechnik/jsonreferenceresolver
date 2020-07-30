# JsonReferenceResolver

This module was created to solve the problem of transfering and receiving JavaScript Objects from and to a Backend that uses Newtonsoft JSON. 

This module also solves the problem with circular dependencies that often happen in a Newtonsoft JSON use-case. 

Basically it iterates trough the Object and looks for objects with a value `$id`, if multiple objects are found with the same `$id` all other objects are replaces by a objects that just contains a reference to the first identical found object. 
